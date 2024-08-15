// @ts-check
import chalk from 'chalk';
import fg from 'fast-glob';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import stripAnsi from 'strip-ansi';
import { fileURLToPath } from 'url';

import { buildExercisePath } from './ExerciseMenu.js';
import logger from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

async function unlink(filePath: string): Promise<void> {
  try {
    await fs.promises.unlink(filePath);
  } catch (_) {
    // ignore
  }
}

async function writeReport(
  module: string,
  week: string,
  exercise: string,
  report: string
): Promise<string | null> {
  const reportDir = path.join(
    __dirname,
    `../../${module}/${week}/test-reports`
  );

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

function getFirstPathMatch(partialPath: string): string | null {
  const entries = fg.sync(partialPath.replace(/\\/g, '/'), { deep: 0 });
  if (entries.length === 0) {
    return null;
  }
  if (entries.length > 1) {
    throw new Error(`Multiple files found: ${entries.join(', ')}`);
  }
  return path.normalize(entries[0]).replace(/\\/g, '/');
}

function getUnitTestPath(
  exercisePath: string,
  homeworkFolder: string
): string | null {
  // If the exercise path ends with `.test` it is expected to represent a
  // single JavaScript (not TypeScript) file that contains both a function-under-test and
  // a unit test or suite of tests.
  if (/\.test$/.test(exercisePath)) {
    const match = getFirstPathMatch(exercisePath + '.js');
    if (!match) {
      throw new Error(`Unit test file not found for exercise: ${exercisePath}`);
    }
    return match;
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
    const match = getFirstPathMatch(unitTestPath);
    if (match) {
      return match;
    }
  }

  // If the exercise directory does not contain a unit test file then it may
  // exist as a transpiled TypeScript file in the `.dist` folder.
  const regexp = new RegExp(
    String.raw`/(\d-\w+?)/(Week\d+)/${homeworkFolder}/`
  );

  const unitTestPath =
    exercisePath.replace(regexp, `/.dist/$1/$2/unit-tests/`) + '.test.js';

  return getFirstPathMatch(unitTestPath);
}

async function execJest(
  exercisePath: string,
  homeworkFolder: string
): Promise<string> {
  let message: string;

  const unitTestPath = getUnitTestPath(exercisePath, homeworkFolder);
  if (!unitTestPath) {
    message = 'A unit test file was not provided for this exercise.';
    console.log(chalk.yellow(message));
    logger.warn(message);
    return '';
  }

  let cmdLine = `npx jest ${unitTestPath} --colors`;

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

    console.log(stderr);
    return '';
  } catch (err: any) {
    const output = `${err.stdout}\n\n${err.message}`.trim();
    const title = '*** Unit Test Error Report ***';
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(output);

    message = stripAnsi(`${title}\n\n${output}`);

    logger.error(message);
    return message;
  }
}

async function execESLint(exercisePath: string): Promise<string> {
  const lintSpec = fs.existsSync(exercisePath)
    ? exercisePath
    : `${exercisePath}.js`;

  // Note: ESLint warnings do not throw an error

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

export async function runTest(
  module: string,
  week: string,
  exercise: string,
  assignmentFolder = 'assignment'
): Promise<string> {
  let report = '';
  const exercisePath = buildExercisePath(
    module,
    week,
    exercise,
    assignmentFolder
  );

  report += await execJest(exercisePath, assignmentFolder);
  report += await execESLint(exercisePath);
  report += await execSpellChecker(exercisePath);

  await writeReport(module, week, exercise, report);

  return report;
}
