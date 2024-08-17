import { checkExerciseHashes } from './compliance-helpers.js';
import ExerciseMenu from './ExerciseMenu.js';

const assignmentFolder = process.env.ASSIGNMENT_FOLDER || 'assignment';
const menu = new ExerciseMenu(assignmentFolder);
const result = checkExerciseHashes(menu.menuData, { silent: true });
console.log(result);
