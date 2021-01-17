/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
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

    walk.simple(rootNode, {
      MemberExpression({ property }) {
        if (property.name === "map") {
          state.map = true;
        } else if (property.name === "filter") {
          state.filter = true;
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
