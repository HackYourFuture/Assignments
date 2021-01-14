const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const fg = require("fast-glob");

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

module.exports = {
  compileMenuData,
  computeHash,
  makePath,
};
