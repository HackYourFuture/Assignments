const fs = require('fs');
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const _rimraf = require('rimraf');

const rimraf = util.promisify(_rimraf);

const { makePath, compileMenuData } = require('./test-runner-helpers');

async function cleanupReportFolders(menuData) {
  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);

    for (const week of weeks) {
      const dirPath = makePath(moduleName, week, 'test-reports');
      if (fs.existsSync(dirPath)) {
        await rimraf(path.normalize(`${dirPath}`));
        console.log(`Cleaned up test reports for ${moduleName}/${week}`);
      }
    }
  }
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
    await cleanupReportFolders(menuData);

    console.log('Cleaning up log files...');
    await cleanUpLogFiles();
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
