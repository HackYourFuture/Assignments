const fs = require("fs");
const path = require("path");
const acorn = require("acorn");

const defaultOptions = {
  parse: false,
  noRequire: false,
};

function beforeAllHelper(testFilePath, options = {}) {
  options = Object.assign(defaultOptions, options);
  const matches = testFilePath
    .replace(/\\/g, "/")
    .match(/^.*\/(.+)\/(Week\d)\/unit-tests\/(.+)\.test\.js$/i);
  if (!matches) {
    throw new Error(`Unexpected test path: ${testFilePath}`);
  }

  const homeworkFolder = process.env.HOMEWORK_FOLDER || "homework";

  const [, module, week, exercise] = matches;
  let exercisePath = path.join(
    __dirname,
    `../${module}/${week}/${homeworkFolder}/${exercise}`
  );

  exercisePath = fs.existsSync(exercisePath)
    ? path.join(exercisePath, "index.js")
    : exercisePath + ".js";

  const result = {};

  if (!options.noRequire) {
    const spy = jest.spyOn(console, "log").mockImplementation();
    result.exports = require(exercisePath);
    spy.mockRestore();
  }

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
