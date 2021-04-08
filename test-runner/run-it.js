const { existsSync } = require('fs');
const http = require('http');
const handler = require('serve-handler');
const open = require('open');
const chalk = require('chalk');
const {
  makePath,
  compileMenuData,
  computeHash,
  promptUseRecent,
  selectModule,
  selectWeek,
  selectExercise,
  loadMostRecentSelection,
  saveMostRecentSelection,
} = require('./test-runner-helpers');
const hashes = require('./.hashes.json');

const PORT = 3030;

function serve(exercisePath) {
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

async function runExercise(exercisePath) {
  if (existsSync(exercisePath)) {
    serve(exercisePath);
  } else {
    try {
      require(exercisePath);
    } catch (err) {
      console.log(chalk.red(`Something went wrong: ${err.message}`));
    }
  }
}

async function main() {
  try {
    const homeworkFolder = process.argv[2] ?? 'homework';

    const menuData = compileMenuData();
    let module, week, exercise;
    let useRecent = false;

    const recentSelection = await loadMostRecentSelection();
    if (recentSelection) {
      ({ module, week, exercise } = recentSelection);
      ({ useRecent } = await promptUseRecent(module, week, exercise));
    }

    if (!useRecent) {
      ({ module } = await selectModule(Object.keys(menuData)));
      ({ week } = await selectWeek(Object.keys(menuData[module])));
      ({ exercise } = await selectExercise(menuData[module][week]));
      saveMostRecentSelection(module, week, exercise);
    }

    const exercisePath = makePath(module, week, homeworkFolder, exercise);
    const hash = await computeHash(exercisePath);

    const untouched = hash === hashes[exercise];
    if (untouched) {
      console.log(chalk.blue('You have not yet worked on this exercise.'));
    }

    console.log('Running exercise, please wait...');
    await runExercise(exercisePath);
  } catch (err) {
    const message = `Something went wrong: ${err.message}`;
    console.error(chalk.red(message));
  }
}

main();
