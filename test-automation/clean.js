const fs = require("fs");
const path = require("path");
const util = require("util");
const _rimraf = require("rimraf");
const chalk = require("chalk");
const { compileMenuData, makePath } = require("./helpers");

const rimraf = util.promisify(_rimraf);

function cleanUpTestReports() {
  console.log("Cleaning test-reports...");
  const menuData = compileMenuData();

  const promises = [];
  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);
    for (const week of weeks) {
      const dirPath = makePath(moduleName, week, "test-reports");
      if (fs.existsSync(dirPath)) {
        promises.push(rimraf(dirPath));
      }
    }
  }
  return Promise.all(promises);
}

function cleanUpLogFiles() {
  console.log("Cleaning up log files...");
  return rimraf(path.join(__dirname, "../*.log"));
}

(async () => {
  try {
    await cleanUpTestReports();
    await cleanUpLogFiles();
  } catch (err) {
    console.log(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
