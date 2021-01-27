const fs = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');
const util = require('util');
const fg = require('fast-glob');
const _rimraf = require('rimraf');
const chalk = require('chalk');
require('dotenv').config();

const rimraf = util.promisify(_rimraf);
const Cryptr = require('cryptr');

const { compileMenuData, makePath } = require('./test-runner-helpers');

async function encryptExerciseSolution(secret, fileSpec, exerciseJSON) {
  const cryptr = new Cryptr(secret);
  const { exercise } = exerciseJSON;
  console.log(`Saving encrypted solution '${exercise}'`);
  const filePaths = fg.sync([fileSpec.replace(/\\/g, '/')], { dot: true });

  const promises = filePaths.map((filePath) => fs.readFile(filePath, 'utf8'));
  const results = await Promise.all(promises);

  for (let i = 0; i < results.length; i++) {
    exerciseJSON.files.push({
      filename: path.basename(filePaths[i]),
      data: cryptr.encrypt(results[i]),
    });
  }

  const destinationPath = path.join(
    __dirname,
    '../test-encrypted',
    exerciseJSON.exercise + '.json'
  );
  return fs.writeFile(
    destinationPath,
    JSON.stringify(exerciseJSON, null, 2),
    'utf8'
  );
}

function encryptExerciseSolutions(secret, module, week, exercises) {
  exercises.forEach((exercise) => {
    const filePath = makePath(module, week, '@homework', exercise);
    let fileSpec, isFolder;

    if (existsSync(filePath)) {
      // test if filePath exist as-is: then it assumed to be a folder
      fileSpec = path.join(filePath, '*');
      isFolder = true;
    } else {
      fileSpec = filePath + '.js';
      isFolder = false;
    }

    const exerciseJSON = { module, week, exercise, isFolder, files: [] };
    encryptExerciseSolution(secret, fileSpec, exerciseJSON);
  });
}

(async () => {
  try {
    const secret = process.env.HYF_SECRET;
    if (!secret) {
      console.log('Secret is not set');
      process.exit(1);
    }

    console.log('Clearing out previous encrypted solutions...');
    const destinationPath = path.join(__dirname, '../test-encrypted/*');
    await rimraf(destinationPath);

    console.log('Scanning for unit tests...');
    const menuData = compileMenuData();
    for (const module of Object.keys(menuData)) {
      for (const week of Object.keys(menuData[module])) {
        encryptExerciseSolutions(secret, module, week, menuData[module][week]);
      }
    }
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
