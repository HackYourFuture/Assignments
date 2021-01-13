const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const glob = require("glob");

function makePath(module, week, folder, exercise) {
  let relPath = `../${module}/${week}/${folder}`;
  if (exercise) {
    relPath += `/${exercise}`;
  }
  return path.join(__dirname, relPath);
}

function compileMenuData(dirNames) {
  const menuData = {};
  dirNames.forEach((dirName) => {
    menuData[dirName] = {};
    const fileSpec = path.join(__dirname, "..", dirName, "**/*.test.js");
    const filePaths = glob.sync(fileSpec);
    filePaths.forEach((filePath) => {
      const matches = filePath.match(/(Week\d).*\/(.+).test.js$/i);
      if (matches) {
        const [, week, testName] = matches;
        if (!menuData[dirName][week]) {
          menuData[dirName][week] = [];
        }
        menuData[dirName][week].push(testName);
      }
    });
  });
  return menuData;
}

function computeHash(exercisePath) {
  const md5sum = crypto.createHash("md5");
  const fileSpec = fs.existsSync(exercisePath) ? "/**/*.js" : ".js";
  const globSpec = exercisePath + fileSpec;
  const filePaths = glob.sync(globSpec);
  for (const filePath of filePaths) {
    const content = fs.readFileSync(filePath, "utf8");
    md5sum.update(content);
  }
  return md5sum.digest("hex");
}

module.exports = {
  compileMenuData,
  computeHash,
  makePath,
};
