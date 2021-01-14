const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const util = require("util");
const _rimraf = require("rimraf");
const chalk = require("chalk");
const { makePath, compileMenuData, computeHash } = require("./helpers");

const rimraf = util.promisify(_rimraf);

async function prepareReportFolders(menuData) {
  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);

    for (const week of weeks) {
      const dirPath = makePath(moduleName, week, "test-reports");
      if (!existsSync(dirPath)) {
        await fs.mkdir(dirPath);
        console.log(
          `Created \`test-reports\` folder for ${moduleName}/${week}`
        );
      } else {
        console.log(`Cleaned up test reports for ${moduleName}/${week}`);
        await rimraf(path.normalize(`${dirPath}/*`));
      }
      const exercises = menuData[moduleName][week];
      for (const exercise of exercises) {
        const reportPath = path.join(dirPath, `${exercise}.todo.txt`);
        await fs.writeFile(reportPath, "This test has not been run.", "utf8");
      }
    }
  }
}

async function prepareHashes(menuData) {
  const hashes = {};

  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);
    for (const week of weeks) {
      const exercises = menuData[moduleName][week];
      for (const exercise of exercises) {
        const exercisePath = makePath(moduleName, week, "homework", exercise);
        hashes[exercise] = await computeHash(exercisePath);
      }
    }
  }

  await fs.writeFile(
    path.join(__dirname, ".hashes.json"),
    JSON.stringify(hashes, null, 2),
    "utf8"
  );
}

(async () => {
  try {
    console.log("Scanning for unit tests...");
    const menuData = compileMenuData();

    console.log("Preparing report folders...");
    await prepareReportFolders(menuData);

    console.log("Computing exercise hashes...");
    await prepareHashes(menuData);

    console.log(chalk.green("Preparation was completed successfully."));
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
