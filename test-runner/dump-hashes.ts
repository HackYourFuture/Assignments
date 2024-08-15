import { dumpExerciseHashes } from './compliance-helpers.js';
import ExerciseMenu from './ExerciseMenu.js';
import chalk from 'chalk';

function main() {
  console.log(chalk.green('Dumping exercise hashes...'));
  const { menuData } = new ExerciseMenu();
  dumpExerciseHashes(menuData);
}

main();
