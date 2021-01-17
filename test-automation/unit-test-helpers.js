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

  const [, module, week, exercise] = matches;
  const exercisePath = path.join(
    __dirname,
    `../${module}/${week}/homework/${exercise}.js`
  );

  const spy = jest.spyOn(console, "log").mockImplementation();
  const result = {};
  result.exports = require(exercisePath);
  spy.mockRestore();
  if (options.parse === true) {
    const source = fs.readFileSync(exercisePath, "utf8");
    result.rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  }
  return result;
}

module.exports = {
  beforeAllHelper,
};
