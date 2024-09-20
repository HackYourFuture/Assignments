import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, it } from 'node:test';
import ExerciseMenu from '../ExerciseMenu.js';

// Note: these test use the Node test runner, which is not the same as Jest.

describe('ExerciseMenu', () => {
  it('should compile data that matches the existing folder structure', async () => {
    const menu = new ExerciseMenu('assignment');

    console.log('menu', menu);
    // Thanks GitHub Copilot for the following code snippet
    const exercisePaths = Object.entries(menu.menuData).flatMap(
      ([module, weeks]) => {
        return Object.entries(weeks).flatMap(([week, exercises]) => {
          return exercises.map(
            (exercise) => `${module}/${week}/assignment/${exercise}`
          );
        });
      }
    );

    for (const exercisePath of exercisePaths) {
      let exerciseExists =
        fs.existsSync(exercisePath) || // Folder containing the exercise
        fs.existsSync(exercisePath + '.js') || // Exercise file
        fs.existsSync(exercisePath + '.test.js'); // Exercise file with embedded tests
      assert.ok(exerciseExists, `Exercise not found: ${exercisePath}`);
    }
  });
});
