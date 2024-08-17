import chalk from 'chalk';
import fg from 'fast-glob';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { MenuData } from './ExerciseMenu.js';

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

export function dumpExerciseHashes(menuData: MenuData): void {
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
    return 'none';
  }

  if (keys.length === 1) {
    return keys[0];
  }

  if (options.silent) {
    return 'multiple';
  }

  console.log(
    'Your current Git branch contains modifications for more than one week:\n'
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
