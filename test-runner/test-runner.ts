// @ts-check
import chalk from 'chalk';
import fg from 'fast-glob';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import stripAnsi from 'strip-ansi';

import { buildExercisePath } from './ExerciseMenu.js';

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

function writeTestResult(
  module: string,
  week: string,
  exercise: string,
  report: string
) {
  const reportFolder = path.join(__dirname, '../../0-test-results');
  if (!fs.existsSync(reportFolder)) {
    fs.mkdirSync(reportFolder);
  }

  const reportFile = path.join(reportFolder, 'TEST_REPORT.md');

  let content = '';

  if (fs.existsSync(reportFile)) {
    content = fs.readFileSync(reportFile, 'utf8');
  }

  const sections: Map<string, string[]> = new Map();

  let sectionHeader = '';

  for (const line of content.split('\n')) {
    if (line.startsWith('## ')) {
      sectionHeader = line.slice(3).trim();
      sections.set(sectionHeader, []);
      continue;
    }

    if (sectionHeader) {
      sections.get(sectionHeader)?.push(line);
    }
  }

  // Add/replace section for current test result

  sectionHeader = `${module} - ${week} - ${exercise}`;
  sections.delete(sectionHeader);
  let sectionContent =
    '\n### Test date: ' + new Date().toLocaleDateString() + '\n';
  sectionContent += '\n```text\n';
  sectionContent += report || '√ All tests passed';
  if (!report.endsWith('\n')) {
    sectionContent += '\n';
  }
  sectionContent += '```\n';
  sections.set(sectionHeader, sectionContent.split('\n'));

  const sectionHeaders = Array.from(sections.keys()).sort();

  let newContent = '# Test Report\n\n';
  newContent += `**Mentors**: This report is generated automatically by the test runner. For more information on how to review homework assignments, please refer to the [Review Guide](${REVIEW_GUIDE_URL}).\n\n`;

  for (const sectionHeader of sectionHeaders) {
    newContent += `## ${sectionHeader}\n`;
    newContent += sections
      .get(sectionHeader)
      ?.join('\n')
      .replaceAll(/[√✓]/g, '✅')
      .replaceAll(/[×✕]/g, '❌');
    newContent += '\n';
  }

  fs.writeFileSync(reportFile, newContent.trim() + '\n');
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

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

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
  assignmentFolder: string
): Promise<string> {
  let message: string;

  const unitTestPath = getUnitTestPath(exercisePath, assignmentFolder);
  if (!unitTestPath) {
    message = 'A unit test file was not provided for this exercise.';
    console.log(chalk.yellow(message));
    return '';
  }

  let cmdLine = `npx jest ${unitTestPath} --colors --noStackTrace`;

  try {
    const { stderr } = await execAsync(cmdLine, {
      encoding: 'utf8',
      env: {
        ...process.env,
        ASSIGNMENT_FOLDER: assignmentFolder,
      },
    });

    console.log(stderr.replaceAll(/[√✓]/g, '✅'));
    return '';
  } catch (err: any) {
    const output = `${err.stdout}\n\n${err.message}`
      .trim()
      .replaceAll(/[√✓]/g, '✅')
      .replaceAll(/[×✕]/g, '❌');

    const title = '*** Unit Test Error Report ***';
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(output);

    message = stripAnsi(`${title}\n\n${output}`);

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
    const message = `\n${title}\n${output}`;
    return message;
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
    const message = `\n${title}\n\n${output}`;
    return message;
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

  // await writeReport(module, week, exercise, report);

  writeTestResult(module, week, exercise, report);

  return report;
}
