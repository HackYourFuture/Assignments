const path = require("path");
const util = require("util");
const _rimraf = require("rimraf");
const chalk = require("chalk");
const { compileMenuData, prepareReportFolders } = require("./helpers");

const rimraf = util.promisify(_rimraf);

(async () => {
  try {
    console.log("Re-initializing test reports...");
    const menuData = compileMenuData();
    await prepareReportFolders(menuData);

    console.log("Cleaning up log files...");
    await rimraf(path.join(__dirname, "../*.log"));
  } catch (err) {
    console.log(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
