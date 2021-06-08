const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const _rimraf = require('rimraf');

const rimraf = util.promisify(_rimraf);

const {
  makePath,
  compileMenuData,
  computeHash,
  prepareReportFolders,
} = require('./test-runner-helpers');

async function prepareHashes(menuData) {
  const hashes = {};

  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);
    for (const week of weeks) {
      const exercises = menuData[moduleName][week];
      for (const exercise of exercises) {
        const exercisePath = makePath(moduleName, week, 'homework', exercise);
        hashes[exercise] = await computeHash(exercisePath);
      }
    }
  }

  await fs.writeFile(
    path.join(__dirname, '../.hashes.json'),
    JSON.stringify(hashes, null, 2),
    'utf8'
  );
}

async function cleanUpLogFiles() {
  await rimraf(path.join(__dirname, '../*.log'));
  await rimraf(path.join(__dirname, '../sysinfo.json'));
}

(async () => {
  try {
    console.log('Scanning for exercises...');
    const menuData = compileMenuData();

    console.log('Preparing report folders...');
    await prepareReportFolders(menuData);

    console.log('Computing exercise hashes...');
    await prepareHashes(menuData);

    console.log('Cleaning up log files...');
    await cleanUpLogFiles();
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
