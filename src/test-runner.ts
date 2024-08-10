// @ts-check
import chalk from 'chalk';
import assert from 'node:assert/strict';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

import logger from './logger.js';
import {
  compileMenuData,
  loadMostRecentSelection,
  makePath,
  promptUseRecent,
  saveMostRecentSelection,
  selectExercise,
  selectModule,
  selectWeek,
} from './test-runner-helpers.js';

const execAsync = promisify(exec);

const disclaimer = `
*** Disclaimer **

The test checker is an automated runner that follows 
a very strict set of rules defined by us, which means
it is possible that it gives you incorrect feedback 
if you solved the problem in a way we did not foresee.
See the results here as suggestions, not the truth!
`;

const MINIMUM_NODE_VERSION = 20;

async function unlink(filePath: string): Promise<void> {
  try {
    await fs.promises.unlink(filePath);
  } catch (_) {
    // ignore
  }
}

/**
 *
 * @param {string} module
 * @param {string} week
 * @param {string} exercise
 * @param {string} report
 * @returns {Promise<string | null>}
 */
async function writeReport(
  module: string,
  week: string,
  exercise: string,
  report: string
): Promise<string | null> {
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
  return null;
}

/**
 *
 * @param {string} exercisePath
 * @param {string} homeworkFolder
 * @returns {Promise<{unitTestPath: string, verbose: boolean} | null>}
 */
async function getUnitTestPath(
  exercisePath: string,
  homeworkFolder: string
): Promise<{ unitTestPath: string; verbose: boolean } | null> {
  // If the exercise path ends with `.test` it is expected to represent a
  // single JavaScript file that contains both a function-under-test and
  // a unit test or suite of tests.
  if (/\.test$/.test(exercisePath)) {
    const unitTestPath = exercisePath + '.ts';
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
    const unitTestPath = path.join(exercisePath, exerciseName + '.test.ts');
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
    '.test.ts';

  if (fs.existsSync(unitTestPath)) {
    // Use verbose mode if the unit-tests folder contains a `.verbose` file.
    const verboseFilePath = path.join(path.dirname(unitTestPath), '.verbose');
    const verbose = fs.existsSync(verboseFilePath);
    return { unitTestPath, verbose };
  }

  // No unit test file was found for the current exercise.
  return null;
}

/**
 *
 * @param {string} exercisePath
 * @param {string} homeworkFolder
 * @returns {Promise<string>}
 */
async function execJest(
  exercisePath: string,
  homeworkFolder: string
): Promise<string> {
  /** @type string */
  let message: string;

  const result = await getUnitTestPath(exercisePath, homeworkFolder);
  if (!result) {
    message = 'A unit test file was not provided.';
    console.log(chalk.yellow(message));
    logger.warn(message);
    return '';
  }

  const { unitTestPath, verbose } = result;

  const exerciseName = path.basename(unitTestPath);

  let cmdLine = `npx jest ${exerciseName} --colors`;

  try {
    const { stderr } = await execAsync(cmdLine, {
      encoding: 'utf8',
      env: {
        ...process.env,
        ASSIGNMENT_FOLDER: homeworkFolder,
      },
    });

    message = 'All unit tests passed.';
    logger.info(message);

    console.log(verbose ? stderr : chalk.green(message));
    return '';
  } catch (err: any) {
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

/**
 *
 * @param {string} exercisePath
 * @returns {Promise<string>}
 */
async function execESLint(exercisePath: string): Promise<string> {
  const lintSpec = fs.existsSync(exercisePath)
    ? exercisePath
    : `${exercisePath}.js`;

  // Note: ESLint warnings do not throw an error

  /** @type {string} */
  let output: string;

  try {
    const { stdout } = await execAsync(`npx eslint ${lintSpec}`, {
      encoding: 'utf8',
    });
    output = stdout;
  } catch (err: any) {
    output = err.stdout;
  }

  if (output) {
    output = output.replace(/\\/g, '/').replace(/^.*\/\.?assignment\//gm, '');
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

/**
 *
 * @param {string} exercisePath
 * @returns {Promise<string>}
 */
async function execSpellChecker(exercisePath: string): Promise<string> {
  try {
    const cspellSpec = fs.existsSync(exercisePath)
      ? path.normalize(`${exercisePath}/*.js`)
      : `${exercisePath}.js`;
    await execAsync(`npx cspell ${cspellSpec}`, { encoding: 'utf8' });
    console.log(chalk.green('No spelling errors detected.'));
    return '';
  } catch (err: any) {
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

/**
 * @returns {Promise<void>}
 */
async function showDisclaimer(): Promise<void> {
  const disclaimerPath = path.join(__dirname, '../.disclaimer');
  const suppressDisclaimer = fs.existsSync(disclaimerPath);
  if (!suppressDisclaimer) {
    console.log(chalk.magenta(disclaimer));
    await fs.promises.writeFile(disclaimerPath, 'off', 'utf8');
  }
}

/**
 * @returns {Promise<void>}
 */
async function main(): Promise<void> {
  const [majorVersion] = process.versions.node.split('.');
  if (+majorVersion < MINIMUM_NODE_VERSION) {
    console.log(
      chalk.red(`Required Node version: ${MINIMUM_NODE_VERSION} or higher.`)
    );
    console.log(
      chalk.red(
        `Your version: ${majorVersion}. Please upgrade your version of Node.`
      )
    );
    process.exit(1);
  }

  try {
    const homeworkFolder = process.argv[2] || 'assignment';

    const menuData = compileMenuData();

    /** @type {string | undefined} */
    let module: string | undefined;
    /** @type {string | undefined} */
    let week: string | undefined;
    /** @type {string | undefined} */
    let exercise: string | undefined;

    let useRecent = false;

    const recentSelection = await loadMostRecentSelection();
    if (recentSelection) {
      ({ module, week, exercise } = recentSelection);
      useRecent = await promptUseRecent(module, week, exercise);
    }

    if (!useRecent) {
      module = await selectModule(Object.keys(menuData), module);
      week = await selectWeek(Object.keys(menuData[module]), week);
      exercise = await selectExercise(menuData[module][week], exercise);
      saveMostRecentSelection(module, week, exercise);
    }

    const title = `>>> Running Unit Test \`${exercise}\` <<<`;
    const separator = '-'.repeat(title.length);
    logger.info(separator);
    logger.info(title);
    logger.info(separator);

    assert(module && week && exercise, 'Invalid selection');

    const exercisePath = makePath(module, week, homeworkFolder, exercise);
    // const hash = await computeHash(exercisePath);

    // const untouched = hash === hashes[exercise];
    // if (untouched) {
    //   logger.info('Exercise has not yet been modified');
    //   console.log(chalk.blue('You have not yet worked on this exercise.'));
    // }

    console.log('Running test, please wait...');
    let report = '';
    report += await execJest(exercisePath, homeworkFolder);
    report += await execESLint(exercisePath);
    report += await execSpellChecker(exercisePath);

    await writeReport(module, week, exercise, report);

    if (report) {
      await showDisclaimer();
    } else {
      logger.info('All steps were completed successfully');
    }
  } catch (err: any) {
    const message = `Something went wrong: ${err.message}`;
    logger.error(message);
    console.error(chalk.red(message));
    throw err;
  }
}

main();
