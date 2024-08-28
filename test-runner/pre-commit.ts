import 'dotenv/config.js';

import chalk from 'chalk';

import {
  getUntestedExercises,
  isValidBranchName,
  checkForUntestedExercises,
} from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';

if (process.env.HUSKY === '0') {
  process.exit(0);
}

const menu = new ExerciseMenu();

if (!(await isValidBranchName(menu))) {
  process.exit(1);
}

checkForUntestedExercises(menu);
