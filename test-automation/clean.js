const fs = require("fs");
const util = require("util");
const _rimraf = require("rimraf");
const chalk = require("chalk");
const { makePath, compileMenuData } = require("./helpers");

const rimraf = util.promisify(_rimraf);

async function clearReportFolders(menuData) {
  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);

    for (const week of weeks) {
      const dirPath = makePath(moduleName, week, "test-reports");
      if (fs.existsSync(dirPath)) {
        console.log(`Cleaned up test-reports folder for ${moduleName}/${week}`);
        await rimraf(dirPath);
      }
    }
  }
}

(async () => {
  try {
    console.log("Cleaning up test-reports folders...");
    const menuData = compileMenuData();
    clearReportFolders(menuData);
  } catch (err) {
    console.log(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
