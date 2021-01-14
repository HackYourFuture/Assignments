const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const util = require("util");
const _rimraf = require("rimraf");
const fg = require("fast-glob");

const rimraf = util.promisify(_rimraf);

function makePath(module, week, folder, exercise) {
  let relPath = `../${module}/${week}/${folder}`;
  if (exercise) {
    relPath += `/${exercise}`;
  }
  return path.join(__dirname, relPath);
}

function compileMenuData() {
  const menuData = {};
  const fileSpec = path
    .join(__dirname, "..", "**/unit-tests/**/*.test.js")
    .replace(/\\/g, "/");
  const filePaths = fg.sync([fileSpec, "!**/node_modules"]);

  filePaths.forEach((filePath) => {
    const matches = filePath.match(
      /homework\/(.+)\/(Week\d).*\/(.+).test.js$/i
    );
    if (matches) {
      const [, module, week, testName] = matches;
      if (!menuData[module]) {
        menuData[module] = {};
      }
      if (!menuData[module][week]) {
        menuData[module][week] = [];
      }
      menuData[module][week].push(testName);
    }
  });
  return menuData;
}

function computeHash(exercisePath) {
  const md5sum = crypto.createHash("md5");
  const fileSpec = fs.existsSync(exercisePath) ? "/**/*.js" : ".js";
  const globSpec = (exercisePath + fileSpec).replace(/\\/g, "/");
  const filePaths = fg.sync(globSpec);
  for (const filePath of filePaths) {
    const content = fs.readFileSync(filePath, "utf8");
    md5sum.update(content);
  }
  return md5sum.digest("hex");
}

async function prepareReportFolders(menuData) {
  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);

    for (const week of weeks) {
      const dirPath = makePath(moduleName, week, "test-reports");
      if (!fs.existsSync(dirPath)) {
        await fs.mkdir(dirPath);
        console.log(
          `Created \`test-reports\` folder for ${moduleName}/${week}`
        );
      } else {
        console.log(`Initialized test reports for ${moduleName}/${week}`);
        await rimraf(path.normalize(`${dirPath}/*`));
      }
      const exercises = menuData[moduleName][week];
      for (const exercise of exercises) {
        const reportPath = path.join(dirPath, `${exercise}.todo.txt`);
        fs.writeFileSync(reportPath, "This test has not been run.", "utf8");
      }
    }
  }
}

module.exports = {
  compileMenuData,
  computeHash,
  prepareReportFolders,
  makePath,
};
