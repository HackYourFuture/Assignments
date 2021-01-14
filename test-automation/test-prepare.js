const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const {
  makePath,
  compileMenuData,
  computeHash,
  prepareReportFolders,
} = require("./helpers");

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
