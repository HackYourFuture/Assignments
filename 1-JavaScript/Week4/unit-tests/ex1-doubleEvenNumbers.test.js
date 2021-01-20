/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
  itIf,
  createGuard,
  findAncestor,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("doubleEvenNumbers", () => {
  let doubleEvenNumbers;
  const state = {};

  beforeAll(() => {
    const { exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    guard.setExports(exported);
    doubleEvenNumbers = exported;

    // Look for `map` and `filter` calls inside the
    // scope of the `doubleEvenNumber` function
    walk.ancestor(rootNode, {
      MemberExpression({ property }, ancestors) {
        if (["map", "filter"].includes(property.name)) {
          const ancestor = findAncestor("FunctionDeclaration", ancestors);
          if (ancestor && ancestor.id.name === "doubleEvenNumbers") {
            state[property.name] = true;
          }
        }
      },
    });
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should return doubled even numbers only", () => {
    expect(doubleEvenNumbers([1, 2, 3, 4])).toEqual([4, 8]);
  });

  itIf(guard.hasExports, "should use `map`", () => {
    expect(state.map).toBeDefined();
  });

  itIf(guard.hasExports, "should use `filter`", () => {
    expect(state.filter).toBeDefined();
  });
});
