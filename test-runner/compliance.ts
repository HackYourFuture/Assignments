import 'dotenv/config.js';

import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import chalk from 'chalk';
import fg from 'fast-glob';

import ExerciseMenu from './ExerciseMenu.js';
import { ExerciseHashes } from './exercises.js';

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function computeHash(exercisePath: string): string {
  const sha256sum = crypto.createHash('sha256');
  const fileSpec = fs.existsSync(exercisePath) ? '/**/*.js' : '.js';
  const globSpec = path
    .join(__dirname, `../../${exercisePath}${fileSpec}`)
    .replace(/\\/g, '/');
  const filePaths = fg.sync(globSpec);
  for (const filePath of filePaths) {
    // Note: convert potential Windows \r\n line endings to \n
    // to avoid hash mismatches
    const content = fs.readFileSync(filePath, 'utf8').replaceAll('\r\n', '\n');
    sha256sum.update(content);
  }
  return sha256sum.digest('hex');
}

export function isModifiedExercise(menu: ExerciseMenu): boolean {
  const { module, week, exercise, exerciseHashes } = menu;
  const exercisePath = `${module}/${week}/assignment/${exercise}`;
  const computedHash = computeHash(exercisePath);
  const cleanHash = exerciseHashes[module][week][exercise];
  return computedHash !== cleanHash;
}

export function diffExerciseHashes(
  exerciseHashes: ExerciseHashes
): ExerciseHashes {
  const diff: ExerciseHashes = {};

  for (const module in exerciseHashes) {
    for (const week in exerciseHashes[module]) {
      for (const exercise in exerciseHashes[module][week]) {
        const computedHash = exerciseHashes[module][week][exercise];
        const exercisePath = `${module}/${week}/assignment/${exercise}`;
        const actualHash = computeHash(exercisePath);
        if (computedHash !== actualHash) {
          if (!diff[module]) {
            diff[module] = {};
          }
          if (!diff[module][week]) {
            diff[module][week] = {};
          }
          diff[module][week][exercise] = actualHash;
        }
      }
    }
  }

  return diff;
}

const MAIN_BRANCH_MESSAGE = `
You are currently on the *main* branch. In the Assignments repository you should 
not be working directly on the main branch.

Please create a new branch for each week. Valid branch names should 
start with your name, followed by the week number and the module name in this
format:

YOUR_NAME-w2-JavaScript
YOUR_NAME-w3-JavaScript
YOUR_NAME-w1-Browsers
YOUR_NAME-w1-UsingAPIs
YOUR_NAME-w2-UsingAPIs

For more information please refer to the link below:

https://github.com/HackYourFuture/JavaScript/blob/main/hand-in-assignments-guide.md#12-every-week
`;

const BRANCH_NAME_MESSAGE = `
Your branch name does conform to the mandated pattern. Valid branch names should 
start with your name, followed by the week number and the module name in this
format:

YOUR_NAME-w2-JavaScript
YOUR_NAME-w3-JavaScript
YOUR_NAME-w1-Browsers
YOUR_NAME-w1-UsingAPIs
YOUR_NAME-w2-UsingAPIs

For more information please refer to the link below:

https://github.com/HackYourFuture/JavaScript/blob/main/hand-in-assignments-guide.md#12-every-week
`;

export async function isValidBranchName(menu: ExerciseMenu): Promise<boolean> {
  if (process.env.BRANCH_CHECKS === '0') {
    return true;
  }

  const { stdout } = await execAsync('git branch --show-current');
  const branchName = stdout.trim();

  if (branchName === 'main') {
    console.error(chalk.red(MAIN_BRANCH_MESSAGE));
    return false;
  }

  const validBranchPatterns: RegExp[] = [];
  for (const module in menu.exerciseHashes) {
    const match = module.match(/^\d-(.*)$/);
    if (!match) {
      throw new Error(`Invalid module name: ${module}`);
    }
    const moduleName = match[1];
    for (const week in menu.exerciseHashes[module]) {
      const match = week.match(/\d+$/);
      if (!match) {
        throw new Error(`Invalid week number: ${week}`);
      }
      const weekNumber = match[0];
      validBranchPatterns.push(
        new RegExp(`-w${weekNumber}-${moduleName}$`, 'i')
      );
    }
  }

  if (!validBranchPatterns.some((pattern) => pattern.test(branchName))) {
    console.error(chalk.red(BRANCH_NAME_MESSAGE));
    return false;
  }

  return true;
}

type CheckOptions = { silent: boolean };

export function checkExerciseHashes(
  exerciseHashes: ExerciseHashes,
  options: CheckOptions = { silent: false }
): string {
  const diff = diffExerciseHashes(exerciseHashes);
  const changes: Record<string, string[]> = {};

  for (const module in diff) {
    for (const week in diff[module]) {
      for (const exercise in diff[module][week]) {
        const key = `${module}/${week}`;
        if (!changes[key]) {
          changes[key] = [];
        }
        changes[key].push(exercise);
      }
    }
  }

  const keys = Object.keys(changes);

  if (keys.length === 0) {
    if (!options.silent) {
      console.log(
        chalk.yellow(
          'Your current branch does not contain modified exercises.\n'
        )
      );
    }
    return 'none';
  }

  if (keys.length === 1) {
    return keys[0];
  }

  if (options.silent) {
    return 'multiple';
  }

  console.log(
    chalk.yellow(
      'Your current branch contains modifications for more than one week:\n'
    )
  );

  for (const key in changes) {
    console.log(chalk.gray(`  ${key}`));
    for (const exercise of changes[key]) {
      console.log(chalk.red(`    - ${exercise}`));
    }
  }

  const message = `
Please follow the instructions from the link below to ensure that your branch
contains only the changes for the week you are working on:

https://github.com/HackYourFuture/JavaScript/blob/main/hand-in-assignments-guide.md
`;

  console.log(message);

  return 'multiple';
}

export type TestStats = {
  hash?: string;
  numPassedTests: number;
  numFailedTests: number;
  hasESLintErrors: boolean;
};

export type ModuleTestStats = {
  [module: string]: { [week: string]: { [exercise: string]: TestStats } };
};

export function updateTestHash(
  module: string,
  week: string,
  exercise: string,
  testStats: TestStats
): ModuleTestStats {
  let moduleStats: ModuleTestStats = {};

  const testStatsPath = path.join(__dirname, `../.test-stats.json`);

  if (fs.existsSync(testStatsPath)) {
    const jsonData = fs.readFileSync(testStatsPath, 'utf8');
    moduleStats = JSON.parse(jsonData);
  }

  if (!moduleStats[module]) {
    moduleStats[module] = {};
  }
  if (!moduleStats[module][week]) {
    moduleStats[module][week] = {};
  }
  const exercisePath = `${module}/${week}/assignment/${exercise}`;

  testStats.hash = computeHash(exercisePath);

  moduleStats[module][week][exercise] = testStats;

  const jsonData = JSON.stringify(moduleStats, null, 2);
  fs.writeFileSync(testStatsPath, jsonData);

  return moduleStats;
}

export function getUntestedExercises(exerciseHashes: ExerciseHashes): string[] {
  // Get info about the exercises that have been modified in the current branch
  const diff = diffExerciseHashes(exerciseHashes);

  // Get info about the exercises that have been tested
  const testHashPath = path.join(__dirname, `../.test-stats.json`);
  let moduleStats: ModuleTestStats = {};
  if (fs.existsSync(testHashPath)) {
    const jsonData = fs.readFileSync(testHashPath, 'utf8');
    moduleStats = JSON.parse(jsonData);
  }

  const untestedExercises: string[] = [];

  for (const module in diff) {
    for (const week in diff[module]) {
      for (const exercise in diff[module][week]) {
        const testHash = moduleStats[module]?.[week]?.[exercise]?.hash;
        if (testHash) {
          const exercisePath = `${module}/${week}/assignment/${exercise}`;
          const computedHash = computeHash(exercisePath);
          if (computedHash !== testHash) {
            untestedExercises.push(`${module}/${week}/${exercise}`);
          }
        } else {
          untestedExercises.push(`${module}/${week}/${exercise}`);
        }
      }
    }
  }

  return untestedExercises;
}

export function checkForUntestedExercises(menu: ExerciseMenu): void {
  const untestedExercises = getUntestedExercises(menu.exerciseHashes);
  if (untestedExercises.length > 0) {
    if (untestedExercises.length === 1) {
      console.error(
        chalk.yellow(`There is still one exercise that needs (re)testing:\n`)
      );
    } else {
      console.error(
        chalk.yellow(
          `There are still ${untestedExercises.length} exercises that need (re)testing:\n`
        )
      );
    }
    for (const exercise of untestedExercises) {
      console.error(chalk.yellow(`• ${exercise}`));
    }

    console.error();
  }
}

export function getChangedWeeks(exerciseHashes: ExerciseHashes): string[] {
  const diff = diffExerciseHashes(exerciseHashes);
  const changedWeeks: string[] = [];
  for (const module in diff) {
    for (const week in diff[module]) {
      changedWeeks.push(`${module}/${week}`);
    }
  }
  return changedWeeks;
}
