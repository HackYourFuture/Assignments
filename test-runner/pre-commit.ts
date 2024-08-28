import 'dotenv/config.js';

import { isValidBranchName, getUntestedExercises } from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';

if (process.env.HUSKY === '0') {
  process.exit(0);
}

const menu = new ExerciseMenu();

if (!(await isValidBranchName(menu))) {
  process.exit(1);
}

const untestedExercises = getUntestedExercises(menu.menuData);
if (untestedExercises.length > 0) {
  if (untestedExercises.length === 1) {
    console.log(`There is still one exercise that needs testing:\n`);
  } else {
    console.log(
      `There are still ${untestedExercises.length} exercises that need testing:\n`
    );
  }
  for (const exercise of untestedExercises) {
    console.log(`• ${exercise}`);
  }

  console.log();
}
