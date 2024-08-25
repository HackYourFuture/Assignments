import { isValidBranchName } from './compliance-helpers.js';
import ExerciseMenu from './ExerciseMenu.js';

const menu = new ExerciseMenu();

if (!(await isValidBranchName(menu))) {
  process.exit(1);
}
