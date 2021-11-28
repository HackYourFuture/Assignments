const fs = require('fs');
const path = require('path');
const util = require('util');
const { exec } = require('child_process');
const chalk = require('chalk');
const prompts = require('prompts');
const {
  makePath,
  compileMenuData,
  computeHash,
  promptUseRecent,
  selectModule,
  selectWeek,
  selectExercise,
  loadMostRecentSelection,
  saveMostRecentSelection,
} = require('./test-runner-helpers');
const logger = require('./logger');
const hashes = require('../.hashes.json');

const execAsync = util.promisify(exec);

const MINIMUM_NODE_VERSION = 14;

const disclaimer = `
*** Disclaimer **

The test checker is an automated runner that follows 
a very strict set of rules defined by us, which means
it is possible that it gives you incorrect feedback 
if you solved the problem in a way we did not foresee.
See the results here as suggestions, not the truth!
`;

async function unlink(filePath) {
  try {
    await fs.promises.unlink(filePath);
  } catch (_) {
    // ignore
  }
}

async function writeReport(module, week, exercise, report) {
  const reportDir = makePath(module, week, 'test-reports');

  const todoFilePath = path.join(reportDir, `${exercise}.todo.txt`);
  await unlink(todoFilePath);

  const passFilePath = path.join(reportDir, `${exercise}.pass.txt`);
  await unlink(passFilePath);

  const failFilePath = path.join(reportDir, `${exercise}.fail.txt`);
  await unlink(failFilePath);

  if (report) {
    await fs.promises.writeFile(failFilePath, report, 'utf8');
    return report;
  }

  const message = 'All tests passed';
  await fs.promises.writeFile(passFilePath, message, 'utf8');
}

function getUnitTestPath(exercisePath, homeworkFolder) {
  // If the exercise path ends with `.test` it is expected to represent a
  // single JavaScript file that contains both a function-under-test and
  // a unit test or suite of tests.
  if (/\.test$/.test(exercisePath)) {
    const unitTestPath = exercisePath + '.js';
    if (!fs.existsSync(unitTestPath)) {
      throw new Error(`Unit test file not found: ${unitTestPath}`);
    }
    return { unitTestPath, verbose: true };
  }

  const exerciseName = path.basename(exercisePath);

  // If the unmodified exercise path exists "as is", it must be directory that
  // contains the exercise file(s).
  if (fs.existsSync(exercisePath)) {
    const stats = fs.statSync(exercisePath);
    if (!stats.isDirectory()) {
      throw new Error(`Expected a directory: ${exercisePath}`);
    }

    // A unit test file may be present in the exercise directory, in which case
    // the unit test itself is considered part of the exercise. This unit test
    // file must then be named `<exercise-name>.test.js`.
    const unitTestPath = path.join(exercisePath, exerciseName + '.test.js');
    if (fs.existsSync(unitTestPath)) {
      return { unitTestPath, verbose: true };
    }
  }

  // If the exercise directory does not contain a unit test file then it may
  // exist in the `unit-tests` directory.
  const regexp = new RegExp(
    `(Week\\d+)\\${path.sep}${homeworkFolder}\\${path.sep}`
  );
  const unitTestPath =
    exercisePath.replace(regexp, `$1${path.sep}unit-tests${path.sep}`) +
    '.test.js';
  if (fs.existsSync(unitTestPath)) {
    // Use verbose mode if the unit-tests folder contains a `.verbose` file.
    const verboseFilePath = path.join(path.dirname(unitTestPath), '.verbose');
    const verbose = fs.existsSync(verboseFilePath);
    return { unitTestPath, verbose };
  }

  // No unit test file was found for the current exercise.
  return null;
}

async function execJest(exercisePath, homeworkFolder) {
  let message;

  const result = getUnitTestPath(exercisePath, homeworkFolder);
  if (!result) {
    message = 'A unit test file was not provided.';
    console.log(chalk.yellow(message));
    logger.warn(message);
    return '';
  }

  const { unitTestPath, verbose } = result;

  const exerciseName = path.basename(unitTestPath);

  let cmdLine = `npx jest ${exerciseName} --colors`;

  if (!verbose) {
    const customReporterPath = path.join(__dirname, 'CustomReporter.js');
    cmdLine += ` --reporters="${customReporterPath}"`;
  }

  try {
    const { stderr } = await execAsync(cmdLine, {
      encoding: 'utf8',
      stdio: 'pipe',
      env: {
        ...process.env,
        HOMEWORK_FOLDER: homeworkFolder,
      },
    });

    message = 'All unit tests passed.';
    logger.info(message);

    console.log(verbose ? stderr : chalk.green(message));
    return '';
  } catch (err) {
    const output = `${err.stdout}\n\n${err.message}`.trim();
    const title = '*** Unit Test Error Report ***';
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(verbose ? output : chalk.red(output));

    const { default: stripAnsi } = await import('strip-ansi');
    message = stripAnsi(`${title}\n\n${output}`);

    logger.error(message);
    return message;
  }
}

async function execESLint(exercisePath) {
  const lintSpec = fs.existsSync(exercisePath)
    ? exercisePath
    : `${exercisePath}.js`;
  // Note: ESLint warnings do not throw an error
  let output;
  try {
    const { stdout } = await execAsync(`npx eslint ${lintSpec}`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    output = stdout;
  } catch (err) {
    output = err.stdout;
  }
  if (output) {
    output = output.replace(/\\/g, '/').replace(/^.*\/\.?homework\//gm, '');
    const title = '*** ESLint Report ***';
    console.log(chalk.yellow(`\n${title}`));
    console.log(chalk.red(output));
    const message = `${title}\n${output}`;
    logger.error(message);
    return '\n' + message;
  }

  console.log(chalk.green('No linting errors detected.'));
  return '';
}

async function execSpellChecker(exercisePath) {
  try {
    const cspellSpec = fs.existsSync(exercisePath)
      ? path.normalize(`${exercisePath}/*.js`)
      : `${exercisePath}.js`;
    await execAsync(`npx cspell ${cspellSpec}`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    console.log(chalk.green('No spelling errors detected.'));
    return '';
  } catch (err) {
    // remove full path
    const output = err.stdout
      .replace(/\\/g, '/')
      .replace(/^.*\/\.?@?homework\//gm, '');

    const title = '*** Spell Checker Report ***';
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(chalk.red(output));
    const message = `${title}\n\n${output}`;
    logger.error(message);
    return '\n' + message;
  }
}

async function showDisclaimer() {
  const disclaimerPath = path.join(__dirname, '../.disclaimer');
  const suppressDisclaimer = fs.existsSync(disclaimerPath);
  if (!suppressDisclaimer) {
    console.log(chalk.magenta(disclaimer));
    const { answer } = await prompts({
      type: 'confirm',
      name: 'answer',
      message: 'Display this disclaimer in the future?',
      initial: true,
    });
    if (!answer) {
      const message = 'Disclaimer turned off';
      console.log(message);
      logger.info(message);
      await fs.promises.writeFile(disclaimerPath, 'off', 'utf8');
    }
  }
}

async function main() {
  const [majorVersion] = process.versions.node.split('.');
  if (+majorVersion < MINIMUM_NODE_VERSION) {
    console.log(chalk.red(`Required Node version: 14 or higher.`));
    console.log(
      chalk.red(
        `Your version: ${majorVersion}. Please upgrade your version of Node.`
      )
    );
    process.exit(1);
  }

  try {
    const homeworkFolder = process.argv[2] || 'homework';

    const menuData = compileMenuData();
    let module, week, exercise;
    let useRecent = false;

    const recentSelection = await loadMostRecentSelection();
    if (recentSelection) {
      ({ module, week, exercise } = recentSelection);
      ({ useRecent } = await promptUseRecent(module, week, exercise));
    }

    if (!useRecent) {
      ({ module } = await selectModule(Object.keys(menuData)));
      ({ week } = await selectWeek(Object.keys(menuData[module])));
      ({ exercise } = await selectExercise(menuData[module][week]));
      saveMostRecentSelection(module, week, exercise);
    }

    const title = `>>> Running Unit Test \`${exercise}\` <<<`;
    const separator = '-'.repeat(title.length);
    logger.info(separator);
    logger.info(title);
    logger.info(separator);

    const exercisePath = makePath(module, week, homeworkFolder, exercise);
    const hash = await computeHash(exercisePath);

    const untouched = hash === hashes[exercise];
    if (untouched) {
      logger.info('Exercise has not yet been modified');
      console.log(chalk.blue('You have not yet worked on this exercise.'));
    }

    console.log('Running test, please wait...');
    let report = '';
    report += await execJest(exercisePath, homeworkFolder);
    report += await execESLint(exercisePath);
    report += await execSpellChecker(exercisePath);

    if (!untouched) {
      await writeReport(module, week, exercise, report);
    }

    if (report) {
      await showDisclaimer();
    } else {
      logger.info('All steps were completed successfully');
    }
  } catch (err) {
    const message = `Something went wrong: ${err.message}`;
    logger.error(message);
    console.error(chalk.red(message));
  }
}

main();
