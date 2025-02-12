// @ts-check
import { AlignmentEnum, AsciiTable3 } from 'ascii-table3';
import chalk from 'chalk';
import fg from 'fast-glob';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import stripAnsi from 'strip-ansi';

import ExerciseMenu, { buildExercisePath } from './ExerciseMenu.js';
import {
  isModifiedExercise,
  ModuleTestStats,
  updateTestHash,
} from './compliance.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

const REVIEW_GUIDE_URL =
  'https://github.com/HackYourFuture/mentors/blob/main/assignment-support/review-guide.md';

async function unlink(filePath: string): Promise<void> {
  try {
    await fs.promises.unlink(filePath);
  } catch (_) {
    // ignore
  }
}

function writeTestSummary(
  module: string,
  week: string,
  moduleStats: ModuleTestStats
) {
  const reportFolder = path.join(__dirname, '../../.test-summary');
  if (!fs.existsSync(reportFolder)) {
    fs.mkdirSync(reportFolder);
  }

  const reportFile = path.join(reportFolder, 'TEST_SUMMARY.md');

  let content = '## Test Summary\n\n';
  content += `**Mentors**: For more information on how to review homework assignments, please refer to the [Review Guide](${REVIEW_GUIDE_URL}).\n\n`;

  content += `### ${module} - ${week}\n\n`;

  const table = new AsciiTable3()
    .setStyle('github-markdown')
    .setHeading('Exercise', 'Passed', 'Failed', 'ESLint')
    .setAlign(2, AlignmentEnum.CENTER)
    .setAlign(3, AlignmentEnum.CENTER)
    .setAlign(4, AlignmentEnum.CENTER);

  const weekStats = moduleStats[module][week];
  for (const exercise in weekStats) {
    const { numPassedTests, numFailedTests, hasESLintErrors } =
      weekStats[exercise];
    const passed = numPassedTests !== 0 ? numPassedTests : '-';
    const failed = numFailedTests !== 0 ? numFailedTests : '-';
    const eslintErrors = hasESLintErrors ? '✕' : '✓';
    table.addRow(exercise, passed, failed, eslintErrors);
  }

  table.sort((a: string[], b: string[]) => a[0].localeCompare(b[0]));

  content += table.toString();

  fs.writeFileSync(reportFile, content.trim() + '\n');
}

async function writeTestReport(
  module: string,
  week: string,
  exercise: string,
  report: string
): Promise<void> {
  const reportDir = path.join(
    __dirname,
    `../../${module}/${week}/test-reports`
  );

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const filePath = path.join(reportDir, `${exercise}.report.txt`);
  await unlink(filePath);

  if (report) {
    await fs.promises.writeFile(filePath, report, 'utf8');
  }
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

function getUnitTestPath(exercisePath: string): string | null {
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
  const regexp = new RegExp(String.raw`/(\d-\w+?)/(Week\d+)/assignment/`);

  const unitTestPath =
    exercisePath.replace(regexp, `/.dist/$1/$2/unit-tests/`) + '.test.js';

  return getFirstPathMatch(unitTestPath);
}

type JestResult = {
  numFailedTests?: number;
  numPassedTests?: number;
  message: string;
};

async function execJest(exercisePath: string): Promise<JestResult> {
  let message: string;
  let output: string;
  let numPassedTests = 0;
  let numFailedTests = 0;

  const unitTestPath = getUnitTestPath(exercisePath);
  if (!unitTestPath) {
    message = 'A unit test file was not provided for this exercise.';
    console.log(chalk.yellow(message));
    return { message };
  }

  let cmdLine = `npx jest ${unitTestPath} --colors --noStackTrace --json`;

  try {
    const { stdout, stderr } = await execAsync(cmdLine, {
      encoding: 'utf8',
      env: { ...process.env },
    });
    ({ numFailedTests, numPassedTests } = JSON.parse(stdout));
    output = stderr;
  } catch (err: any) {
    ({ numFailedTests, numPassedTests } = JSON.parse(err.stdout));
    output = err.message;
  }

  output = `${output}`
    .trim()
    .replaceAll(/[√✓]/g, '✅')
    .replaceAll(/[×✕]/g, '❌');

  const title = '*** Unit Test Error Report ***';
  console.log(chalk.yellow(`\n${title}\n`));
  console.log(output);

  message = stripAnsi(`${title}\n\n${output}`);

  return { message, numFailedTests, numPassedTests };
}

async function execESLint(
  exercisePath: string
): Promise<{ hasErrors: boolean; message: string }> {
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
    const message = `\n${title}\n${output}`;
    return { hasErrors: true, message };
  }

  const message = 'No linting errors detected.';
  console.log(chalk.green(message));
  return { hasErrors: false, message };
}

async function execSpellChecker(exercisePath: string): Promise<string> {
  try {
    const cspellSpec = fs.existsSync(exercisePath)
      ? path.normalize(`${exercisePath}/*.js`)
      : `${exercisePath}.js`;
    await execAsync(`npx cspell ${cspellSpec}`, { encoding: 'utf8' });
    const message = 'No spelling errors detected.';
    console.log(chalk.green(message));
    return message;
  } catch (err: any) {
    let output = err.stdout.trim();
    if (!output) {
      console.log(chalk.green('No spelling errors detected.'));
      return '';
    }

    // remove full path
    output = output.replace(/\\/g, '/').replace(/^.*\/\.?@?homework\//gm, '');

    const title = '*** Spell Checker Report ***';
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(chalk.red(output));
    const message = `\n\n${title}\n\n${output}`;
    return message;
  }
}

export async function runTest(menu: ExerciseMenu): Promise<void> {
  const { module, week, exercise } = menu;

  let report = '';
  const exercisePath = buildExercisePath(module, week, exercise);

  const jestResult = await execJest(exercisePath);
  report += `${jestResult.message}\n`;

  const eslintResult = await execESLint(exercisePath);
  report += `${eslintResult.message}\n`;

  const spellCheckerReport = await execSpellChecker(exercisePath);
  report += `${spellCheckerReport}\n`;

  if (isModifiedExercise(menu)) {
    const moduleStats = updateTestHash(module, week, exercise, {
      numPassedTests: jestResult?.numPassedTests || 0,
      numFailedTests: jestResult?.numFailedTests || 0,
      hasESLintErrors: eslintResult.hasErrors,
    });

    await writeTestReport(module, week, exercise, report);

    writeTestSummary(module, week, moduleStats);
  }
}
