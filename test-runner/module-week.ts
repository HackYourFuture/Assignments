import { checkExerciseHashes } from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';

const menu = new ExerciseMenu();
const result = checkExerciseHashes(menu.exerciseHashes, { silent: true });
console.log(result);
