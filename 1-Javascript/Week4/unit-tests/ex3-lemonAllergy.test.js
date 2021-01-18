/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("sanitizeFruitBasket", () => {
  let sanitizeFruitBasket;
  let fruitBasket;
  let savedFruitBasket;

  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    const { exports, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    ({ sanitizeFruitBasket, fruitBasket } = exports);
    savedFruitBasket = [...fruitBasket];

    walk.simple(rootNode, {
      MemberExpression({ property }) {
        if (property.name === "filter") {
          state.filter = true;
        }
      },
    });
  });

  it("should take two parameters", () => {
    expect(sanitizeFruitBasket).toHaveLength(2);
  });

  it("should use `filter`", () => {
    expect(state.filter).toBeDefined();
  });

  it("should not modify the original `fruitBasket` array", () => {
    expect(fruitBasket).toEqual(savedFruitBasket);
  });

  it("should list the sanitized fruit basket", () => {
    const newBasket = fruitBasket.filter((fruit) => fruit !== "lemon");
    const expected = `My mom bought me a fruit basket containing ${newBasket.join(
      ", "
    )}!`;

    expect(sanitizeFruitBasket(fruitBasket, "lemon")).toBe(expected);
  });
});
