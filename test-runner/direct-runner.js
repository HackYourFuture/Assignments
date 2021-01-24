const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const open = require("open");
const chalk = require("chalk");
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
} = require("./test-runner-helpers");
const logger = require("./logger");
const hashes = require("./.hashes.json");

async function runExercise(exercisePath) {
  if (existsSync(exercisePath)) {
    const urlPath = path.join(exercisePath, "index.html");
    await open(`file://${urlPath}`);
  } else {
    const code = await fs.readFile(exercisePath + ".js", "utf8");
    eval(code);
  }
}

async function main() {
  try {
    const menuData = compileMenuData();
    let module, week, exercise;
    let useRecent = false;

    const homeworkFolder = process.env.HOMEWORK_FOLDER || "homework";

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

    const title = `>>> Running Unit Test \`${exercise}\` <<<`;
    const separator = "-".repeat(title.length);
    logger.info(separator);
    logger.info(title);
    logger.info(separator);

    const exercisePath = makePath(module, week, homeworkFolder, exercise);
    const hash = await computeHash(exercisePath);

    const untouched = hash === hashes[exercise];
    if (untouched) {
      logger.info("Exercise has not yet been modified");
      console.log(chalk.blue("You have not yet worked on this exercise."));
    }

    console.log("Running exercise, please wait...");
    await runExercise(exercisePath);
  } catch (err) {
    const message = `Something went wrong: ${err.message}`;
    logger.error(message);
    console.error(chalk.red(message));
  }
}

main();
