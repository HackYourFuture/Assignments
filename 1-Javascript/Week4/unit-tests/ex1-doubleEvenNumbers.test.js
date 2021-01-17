/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
  findAncestor,
} = require("../../../test-automation/unit-test-helpers");

describe("doubleEvenNumbers", () => {
  let doubleEvenNumbers;
  let rootNode;
  const state = {};

  beforeAll(() => {
    let exports;
    ({ exports, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));
    doubleEvenNumbers = exports;

    // Look for `map` and `filter` calls inside the
    // `doubleEvenNumber` function declaration
    walk.ancestor(rootNode, {
      MemberExpression({ property }, ancestors) {
        if (["map", "filter"].includes(property.name)) {
          const { found, ancestor } = findAncestor(
            "FunctionDeclaration",
            ancestors
          );
          if (found && ancestor.id.name === "doubleEvenNumbers") {
            state[property.name] = true;
          }
        }
      },
    });
  });

  it("should return doubled even numbers only", () => {
    expect(doubleEvenNumbers([1, 2, 3, 4])).toEqual([4, 8]);
  });

  it("should use `map`", () => {
    expect(state.map).toBeDefined();
  });

  it("should use `filter`", () => {
    expect(state.filter).toBeDefined();
  });
});
