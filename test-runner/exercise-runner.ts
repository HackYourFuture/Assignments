import chalk from 'chalk';
import fs from 'fs';
import http from 'http';
import open from 'open';
import path from 'path';
import handler from 'serve-handler';

import ExerciseMenu from './ExerciseMenu.js';
import { checkExerciseHashes, isValidBranchName } from './compliance.js';

const PORT = 3030;

function serve(exercisePath: string) {
  const options = {
    public: exercisePath,
    headers: [
      {
        source: '**/*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
    ],
  };
  const server = http.createServer((request, response) => {
    return handler(request, response, options);
  });

  server.listen(PORT, () => {
    console.log(
      chalk.magenta(`HTTP server running at http://localhost:${PORT}`)
    );
    console.log(chalk.magenta('Press Ctrl-C to exit.'));
    open(`http://localhost:${PORT}`);
  });
}

async function runExercise(exercisePath: string) {
  if (exercisePath.endsWith('.test')) {
    const testWarning =
      'This is a unit test exercise. Please use `npm test` to run it.';
    console.log(chalk.red(testWarning));
    return;
  }

  let importPath = exercisePath + '.js';

  if (fs.existsSync(exercisePath)) {
    // Check for an index.html file in the exercisePath
    const htmlPath = path.join(exercisePath, 'index.html');
    if (fs.existsSync(htmlPath)) {
      // Run the exercise as a web app by starting an HTTP server
      serve(exercisePath);
      return;
    }

    // Let's make sure we have a directory at this point
    const stats = fs.statSync(exercisePath);
    if (stats.isDirectory()) {
      importPath = path.join(exercisePath, 'main.js');
      if (!fs.existsSync(importPath)) {
        const exerciseName = path.basename(exercisePath);
        importPath = path.join(exercisePath, exerciseName + '.js');
      }
    } else {
      throw new Error(`Unexpected exercise path: ${exercisePath}`);
    }
  }

  try {
    await import('file://' + importPath);
  } catch (err: any) {
    console.log(chalk.red(`Something went wrong: ${err.message}`));
  }
}

async function main() {
  try {
    const menu = new ExerciseMenu();

    if (!(await isValidBranchName(menu))) {
      process.exit(1);
    }

    const moduleWeek = checkExerciseHashes(menu.exerciseHashes);
    if (moduleWeek === 'multiple') {
      return;
    }

    const exercisePath = await menu.getExercisePath();

    console.log('Running exercise, please wait...');
    await runExercise(exercisePath);
  } catch (err: any) {
    if (err.name === 'ExitPromptError') {
      console.log(chalk.red('Exercise run aborted.'));
    } else {
      const message = `Something went wrong: ${err.message}`;
      console.error(chalk.red(message));
    }
  }
}

main();
