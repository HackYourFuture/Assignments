import 'dotenv/config.js';

import chalk from 'chalk';
import fg from 'fast-glob';
import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import ExerciseMenu, { MenuData } from './ExerciseMenu.js';

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPUTED_HASHES_JSON_PATH = path.join(__dirname, '../../.hashes.json');

function computeHash(exercisePath: string): string {
  const md5sum = crypto.createHash('sha256');
  const fileSpec = fs.existsSync(exercisePath) ? '/**/*.js' : '.js';
  const globSpec = path
    .join(__dirname, `../../${exercisePath}${fileSpec}`)
    .replace(/\\/g, '/');
  const filePaths = fg.sync(globSpec);
  for (const filePath of filePaths) {
    const content = fs.readFileSync(filePath, 'utf8');
    md5sum.update(content);
  }
  return md5sum.digest('hex');
}

type Hashes = {
  [module: string]: { [week: string]: { [exercise: string]: string } };
};

export function createExerciseHashes(menuData: MenuData): void {
  const hashes: Hashes = {};
  for (const module in menuData) {
    for (const week in menuData[module]) {
      for (const exercise of menuData[module][week]) {
        const exercisePath = `${module}/${week}/assignment/${exercise}`;
        if (!hashes[module]) {
          hashes[module] = {};
        }
        if (!hashes[module][week]) {
          hashes[module][week] = {};
        }
        hashes[module][week][exercise] = computeHash(exercisePath);
      }
    }
  }

  const hashesJson = JSON.stringify(hashes, null, 2);
  fs.writeFileSync(COMPUTED_HASHES_JSON_PATH, hashesJson);
}

export function diffExerciseHashes(menuData: MenuData): Hashes {
  const diff: Hashes = {};
  const computedHashes = JSON.parse(
    fs.readFileSync(COMPUTED_HASHES_JSON_PATH, 'utf8')
  );
  for (const module in menuData) {
    for (const week in menuData[module]) {
      for (const exercise of menuData[module][week]) {
        const computedHash = computedHashes[module][week][exercise];
        const exercisePath = `${module}/${week}/assignment/${exercise}`;
        const actualHash = computeHash(exercisePath);
        if (computedHash !== actualHash) {
          if (!diff[module]) {
            diff[module] = {};
          }
          if (!diff[module][week]) {
            diff[module][week] = {};
          }
          diff[module][week][exercise] = computeHash(exercisePath);
        }
      }
    }
  }

  return diff;
}

const MAIN_BRANCH_MESSAGE = `
You are currently on the *main* branch. In this Assignments repository you should not be working directly on the main branch.

Please create a new branch for each week (e.g. JohnDoe-w2-JavaScript) as instructed in the link below:

https://github.com/HackYourFuture/JavaScript/blob/main/hand-in-assignments-guide.md
`;

const BRANCH_NAME_MESSAGE = `
Your branch name does conform to the mandated pattern <your-name>-w<week>-<module>, e.g. JohnDoe-w2-JavaScript.

Please rename your branch to match the pattern as described in the link below:

https://github.com/HackYourFuture/JavaScript/blob/main/hand-in-assignments-guide.md
`;

export async function isValidBranchName(menu: ExerciseMenu): Promise<boolean> {
  if (process.env.BRANCH_NAME_CHECK !== 'true') {
    return true;
  }

  const modulesNames = Object.keys(menu.menuData).map((name) =>
    name.replace(/\d-/, '')
  );
  const branchNamePattern = new RegExp(
    String.raw`-w\d-(?:${modulesNames.join('|')})$`,
    'i'
  );

  const { stdout } = await execAsync('git branch --show-current');
  const branchName = stdout.trim();

  if (branchName === 'main') {
    console.log(chalk.red(MAIN_BRANCH_MESSAGE));
    return false;
  }

  if (!branchNamePattern.test(branchName)) {
    console.log(chalk.red(BRANCH_NAME_MESSAGE));
    return false;
  }

  return true;
}

type CheckOptions = { silent: boolean };

export function checkExerciseHashes(
  menuData: MenuData,
  options: CheckOptions = { silent: false }
): string {
  const diff = diffExerciseHashes(menuData);
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
      console.log('Your current branch does not contain modified exercises.');
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
    'Your current branch contains modifications for more than one week:\n'
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

export function getChangedWeeks(menuData: MenuData): string[] {
  const diff = diffExerciseHashes(menuData);
  const changedWeeks: string[] = [];
  for (const module in diff) {
    for (const week in diff[module]) {
      changedWeeks.push(`${module}/${week}`);
    }
  }
  return changedWeeks;
}
