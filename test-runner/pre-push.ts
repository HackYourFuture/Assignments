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

const untested = getUntestedExercises(menu.exerciseHashes);
if (untested.length > 0) {
  console.error(
    `There are ${untested.length} exercise(s) that need (re)testing before you can push.`
  );

  console.error('\nExercises that still need (re)testing:');
  untested.forEach((exercise: string) => {
    console.error(`- ${exercise}`);
  });
  process.exit(1);
}
