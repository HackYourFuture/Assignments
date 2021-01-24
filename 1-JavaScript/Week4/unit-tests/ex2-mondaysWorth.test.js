/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const { beforeAllHelper } = require("../../../test-runner/unit-test-helpers");

describe("mondaysWorth", () => {
  let exported, rootNode, computeEarnings, mondayTasks, hourlyRate;

  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));
    if (!exported) return;

    ({ computeEarnings, mondayTasks, hourlyRate } = exported);

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ property }) {
          if (property.name === "map") {
            state.map = true;
          }
        },
      });
  });

  it("should exist and be executable", () => {
    expect(exported).toBeDefined();
  });

  it("should take two parameters", () => {
    if (!exported) return;
    expect(computeEarnings).toHaveLength(2);
  });

  it("should use `map`", () => {
    if (!exported) return;
    expect(state.map).toBeDefined();
  });

  it("should compute the earnings as a formatted Euro amount", () => {
    if (!exported) return;
    const total = mondayTasks
      .map((task) => (task.duration / 60) * hourlyRate)
      .reduce((sum, value) => sum + value, 0);

    expect(computeEarnings(mondayTasks, hourlyRate)).toBe(
      `€${total.toFixed(2)}`
    );
  });
});
