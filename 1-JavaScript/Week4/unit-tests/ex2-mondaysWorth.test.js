/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
  itIf,
  createGuard,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("mondaysWorth", () => {
  let computeEarnings, mondayTasks, hourlyRate;

  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    const { exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    guard.setExports(exported);
    ({ computeEarnings, mondayTasks, hourlyRate } = exported);

    walk.simple(rootNode, {
      MemberExpression({ property }) {
        if (property.name === "map") {
          state.map = true;
        }
      },
    });
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should take two parameters", () => {
    expect(computeEarnings).toHaveLength(2);
  });

  itIf(guard.hasExports, "should use `map`", () => {
    expect(state.map).toBeDefined();
  });

  itIf(
    guard.hasExports,
    "should compute the earnings as a formatted Euro amount",
    () => {
      const total = mondayTasks
        .map((task) => (task.duration / 60) * hourlyRate)
        .reduce((sum, value) => sum + value, 0);

      expect(computeEarnings(mondayTasks, hourlyRate)).toBe(
        `€${total.toFixed(2)}`
      );
    }
  );
});
