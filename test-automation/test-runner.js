const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const inquirer = require("inquirer");
const chalk = require("chalk");
const prompts = require("prompts");
const { makePath, compileMenuData, computeHash } = require("./helpers");
const logger = require("./logger");
const hashes = require("./.hashes.json");

const disclaimer = `
*** Disclaimer **

The test checker is an automated runner that follows 
a very strict set of rules defined by us, which means
it is possible that it gives you incorrect feedback 
if you solved the problem in a way we did not foresee.
See the results here as suggestions, not the truth!
`;

async function unlink(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (_) {
    // ignore
  }
}

async function writeReport(module, week, exercise, report) {
  const reportDir = makePath(module, week, "test-reports");

  const todoFilePath = path.join(reportDir, `${exercise}.todo.txt`);
  await unlink(todoFilePath);

  const passFilePath = path.join(reportDir, `${exercise}.pass.txt`);
  await unlink(passFilePath);

  const failFilePath = path.join(reportDir, `${exercise}.fail.txt`);
  await unlink(failFilePath);

  if (report) {
    await fs.writeFile(failFilePath, report, "utf8");
    return report;
  }

  const message = "All tests passed";
  await fs.writeFile(passFilePath, message, "utf8");
}

function promptUseRecent(module, week, exercise) {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "useRecent",
      message: `Rerun last test (${module}, ${week}, ${exercise})?`,
      default: true,
    },
  ]);
}

function selectModule(choices, module) {
  return inquirer.prompt([
    {
      type: "list",
      name: "module",
      message: "Which module?",
      choices,
      default: module,
    },
  ]);
}

function selectWeek(choices, week) {
  return inquirer.prompt([
    {
      type: "list",
      name: "week",
      message: "Which week?",
      choices,
      default: week,
    },
  ]);
}

function selectExercise(choices, exercise) {
  return inquirer.prompt([
    {
      type: "list",
      name: "exercise",
      message: "Which exercise?",
      choices,
      default: exercise,
    },
  ]);
}

function execJest(name) {
  try {
    const customReporterPath = path.join(__dirname, "CustomReporter.js");
    execSync(
      `npx jest ${name} --silent false --verbose false --reporters="${customReporterPath}"`,
      { encoding: "utf8" }
    );
    console.log(chalk.green("All unit tests passed."));
    return "";
  } catch (err) {
    const output = err.stdout.trim();
    const title = "*** Unit Test Error Report ***";
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(chalk.red(output));
    const message = `${title}\n\n${output}`;
    logger.error(message);
    return message;
  }
}

function execESLint(exercisePath) {
  const lintSpec = existsSync(exercisePath)
    ? exercisePath
    : `${exercisePath}.js`;
  const output = execSync(`npx eslint ${lintSpec}`, { encoding: "utf8" });
  if (output) {
    const title = "*** ESLint Report ***";
    console.log(chalk.yellow(`\n${title}`));
    console.log(chalk.red(output));
    const message = `${title}\n${output}`;
    logger.error(message);
    return "\n" + message;
  }

  console.log(chalk.green("No linting errors detected."));
  return "";
}

function execSpellChecker(exercisePath) {
  try {
    const cspellSpec = existsSync(exercisePath)
      ? path.normalize(`${exercisePath}/**/*.js`)
      : `${exercisePath}.js`;
    execSync(`npx cspell ${cspellSpec}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    console.log(chalk.green("No spelling errors detected."));
    return "";
  } catch (err) {
    const output = err.stdout.trim();
    const title = "*** Spell Checker Report ***";
    console.log(chalk.yellow(`\n${title}\n`));
    console.log(chalk.red(output));
    const message = `${title}\n\n${output}`;
    logger.error(message);
    return "\n" + message;
  }
}

async function loadMostRecentSelection() {
  try {
    const json = await fs.readFile(
      path.join(__dirname, ".recent.json"),
      "utf8"
    );
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

function saveMostRecentSelection(module, week, exercise) {
  const json = JSON.stringify({ module, week, exercise });
  return fs.writeFile(path.join(__dirname, ".recent.json"), json, "utf8");
}

async function showDisclaimer() {
  const disclaimerPath = path.join(__dirname, ".disclaimer");
  const suppressDisclaimer = existsSync(disclaimerPath);
  if (!suppressDisclaimer) {
    console.log(chalk.magenta(disclaimer));
    const { answer } = await prompts({
      type: "confirm",
      name: "answer",
      message: "Display this disclaimer in the future?",
      initial: true,
    });
    if (!answer) {
      console.log("Disclaimer turned off");
      logger.info("Disclaimer turned off");
      await fs.writeFile(disclaimerPath, "Disclaimer turned off", "utf8");
    }
  }
}

async function main() {
  try {
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

    logger.info(`>>> Running Unit Test \`${exercise}\` <<<`);

    const exercisePath = makePath(module, week, "homework", exercise);
    const hash = await computeHash(exercisePath);

    const untouched = hash === hashes[exercise];
    if (untouched) {
      console.log(chalk.blue("You have not yet worked on this exercise."));
    }

    let report = "";
    report += execJest(exercise);
    report += execESLint(exercisePath);
    report += execSpellChecker(exercisePath);

    if (!untouched) {
      await writeReport(module, week, exercise, report);
    }

    if (report) {
      await showDisclaimer();
    } else {
      logger.info("All steps were completed successfully");
    }
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
}

main();
