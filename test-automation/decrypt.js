const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const fg = require("fast-glob");
const chalk = require("chalk");

const Cryptr = require("cryptr");

const { makePath } = require("./test-runner-helpers");

const solutionsFolderName = ".homework";

async function decryptExerciseSolution(filePath, password) {
  const cryptr = new Cryptr(password);

  const jsonData = await fs.readFile(filePath, "utf8");
  let exerciseJSON;

  try {
    exerciseJSON = JSON.parse(jsonData);
  } catch (_) {
    console.error(chalk.red(`${filePath}\n Error parsing JSON data`));
    return;
  }

  const { module, week, exercise, isFolder, files } = exerciseJSON;

  const solutionsDir = path.join(makePath(module, week, solutionsFolderName));
  if (!existsSync(solutionsDir)) {
    await fs.mkdir(solutionsDir);
  }

  let exerciseDir = solutionsDir;
  if (isFolder) {
    exerciseDir = path.join(solutionsDir, exercise);
    if (!existsSync(exerciseDir)) {
      await fs.mkdir(exerciseDir);
    }
  }

  const promises = files.map((file) => {
    const fileContents = cryptr.decrypt(file.data);
    console.log(`Decrypting exercise solution ${exercise}`);
    fs.writeFile(path.join(exerciseDir, file.filename), fileContents, "utf8");
  });

  return Promise.all(promises);
}

(async () => {
  try {
    let { password } = await inquirer.prompt([
      {
        message: "Password?",
        type: "input",
        name: "password",
      },
    ]);
    password = password.trim();
    if (!password) {
      process.exit(1);
    }

    const filePaths = await fg.sync(
      path.join(__dirname, "../test-encrypted/*.json").replace(/\\/g, "/")
    );

    const promises = filePaths.map((filePath) =>
      decryptExerciseSolution(filePath, password)
    );

    await Promise.all(promises);
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
