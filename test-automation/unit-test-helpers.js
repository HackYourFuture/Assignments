const fs = require("fs");
const acorn = require("acorn");

function expectedReceived(expected, received) {
  if (expected === received) {
    return "";
  }
  return `\nExpected: ${expected}\nReceived: ${received}`;
}

function beforeAllHelper(exercisePath, options = {}) {
  const spy = jest.spyOn(console, "log").mockImplementation();
  const result = {};
  result.exportedFunction = require(exercisePath);
  spy.mockRestore();
  if (options.parse === true) {
    const source = fs.readFileSync(exercisePath, "utf8");
    result.rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  }
  return result;
}

module.exports = {
  beforeAllHelper,
  expectedReceived,
};
