import { diffExerciseHashes } from './compliance-helpers.js';
import ExerciseMenu from './ExerciseMenu.js';
import { runTest } from './test-runner.js';

async function main() {
  const { menuData } = new ExerciseMenu();
  const changes = diffExerciseHashes(menuData);
  if (Object.keys(changes).length === 0) {
    console.log('No exercises have been changed');
    return;
  }

  for (const module in changes) {
    for (const week in changes[module]) {
      for (const exercise in changes[module][week]) {
        await runTest(module, week, exercise);
      }
    }
  }
}

main();
