const fs = require("fs");
const path = require("path");
const acorn = require("acorn");

function beforeAllHelper(testFilePath, options = {}) {
  const matches = testFilePath
    .replace(/\\/g, "/")
    .match(/^.*\/(.+)\/(Week\d)\/unit-tests\/(.+)\.test\.js$/i);
  if (!matches) {
    throw new Error(`Unexpected test path: ${testFilePath}`);
  }

  const homeworkFolder = process.env.HOMEWORK_FOLDER || "homework";

  const [, module, week, exercise] = matches;
  const exercisePath = path.join(
    __dirname,
    `../${module}/${week}/${homeworkFolder}/${exercise}.js`
  );

  const spy = jest.spyOn(console, "log").mockImplementation();
  const result = {};
  result.exports = require(exercisePath);
  spy.mockRestore();
  result.source = fs.readFileSync(exercisePath, "utf8");
  if (options.parse) {
    result.rootNode = acorn.parse(result.source, { ecmaVersion: 2020 });
  }
  return result;
}

function findAncestor(type, ancestors) {
  let index = ancestors.length - 1;
  while (index >= 0) {
    if (ancestors[index].type === type) {
      return ancestors[index];
    }
    index--;
  }
  return null;
}

module.exports = {
  beforeAllHelper,
  findAncestor,
};
