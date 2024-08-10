import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, it } from 'node:test';

import { compileMenuData } from '../test-runner-helpers.js';

describe('test-runner-helpers', () => {
  describe('compileMenuData', () => {
    it('should compile data that matches the expected structure', async () => {
      const menuData = compileMenuData();
      // Thanks GitHub Copilot for the following code snippet
      const exercisePaths = Object.entries(menuData).flatMap(
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
});
