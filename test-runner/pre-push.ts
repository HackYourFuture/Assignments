import 'dotenv/config.js';

import { getUntestedExercises, isValidBranchName } from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';

if (process.env.HUSKY === '0') {
  process.exit(0);
}

const menu = new ExerciseMenu();

if (!(await isValidBranchName(menu))) {
  process.exit(1);
}

const untested = getUntestedExercises(menu.menuData);
if (untested.length > 0) {
  console.log(
    `There are ${untested.length} exercise(s) that need (re)testing before you can push.`
  );

  console.log('\nExercises that still need (re)testing:');
  untested.forEach((exercise) => {
    console.log(`- ${exercise}`);
  });
  process.exit(1);
}
