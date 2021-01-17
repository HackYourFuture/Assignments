/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("mondaysWorth", () => {
  let computeEarnings;
  let mondayTasks;
  let hourlyRate;

  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    const { exports, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    ({ computeEarnings, mondayTasks, hourlyRate } = exports);

    walk.simple(rootNode, {
      MemberExpression({ property }) {
        if (property.name === "map") {
          state.map = true;
        }
      },
    });
  });

  it("should take two parameters", () => {
    expect(computeEarnings).toHaveLength(2);
  });

  it("should use `map`", () => {
    expect(state.map).toBeDefined();
  });

  it("should compute the earnings as a formatted Euro amount", () => {
    const total = mondayTasks
      .map((task) => (task.duration / 60) * hourlyRate)
      .reduce((sum, value) => sum + value, 0);

    expect(computeEarnings(mondayTasks, hourlyRate)).toBe(
      `€${total.toFixed(2)}`
    );
  });
});
