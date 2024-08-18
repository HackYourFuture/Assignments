import 'dotenv/config';

import chalk from 'chalk';
import { createExerciseHashes } from './compliance-helpers.js';
import ExerciseMenu from './ExerciseMenu.js';

function main() {
  if (process.env.CREATE_HASHES !== 'true') {
    return;
  }
  const { menuData } = new ExerciseMenu();
  createExerciseHashes(menuData);
  console.log(chalk.green('Hashes created!'));
}

main();
