import { diffExerciseHashes } from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';
import { runTest } from './test-runner.js';

async function main() {
  const { exerciseHashes } = new ExerciseMenu();
  const changes = diffExerciseHashes(exerciseHashes);
  if (Object.keys(changes).length === 0) {
    console.log('No exercises have been changed');
    return;
  }

  for (const module in changes) {
    for (const week in changes[module]) {
      for (const exercise in changes[module][week]) {
        await runTest(module, week, exercise, true);
      }
    }
  }
}

main();
