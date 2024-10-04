import 'dotenv/config.js';

import {
  checkExerciseHashes,
  checkForUntestedExercises,
  isValidBranchName,
} from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';

if (process.env.HUSKY === '0') {
  process.exit(0);
}

const menu = new ExerciseMenu();

if (!(await isValidBranchName(menu))) {
  process.exit(1);
}

const moduleWeek = checkExerciseHashes(menu.exerciseHashes);
if (moduleWeek === 'multiple') {
  process.exit(1);
}

checkForUntestedExercises(menu);
