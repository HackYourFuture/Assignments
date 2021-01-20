/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
  itIf,
  createGuard,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("sanitizeFruitBasket", () => {
  let sanitizeFruitBasket, fruitBasket, savedFruitBasket;

  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    const { exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    guard.setExports(exported);

    ({ sanitizeFruitBasket, fruitBasket } = exported);
    savedFruitBasket = [...fruitBasket];

    walk.simple(rootNode, {
      MemberExpression({ property }) {
        if (property.name === "filter") {
          state.filter = true;
        }
      },
    });
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should take two parameters", () => {
    expect(sanitizeFruitBasket).toHaveLength(2);
  });

  itIf(guard.hasExports, "should use `filter`", () => {
    expect(state.filter).toBeDefined();
  });

  itIf(
    guard.hasExports,
    "should not modify the original `fruitBasket` array",
    () => {
      expect(fruitBasket).toEqual(savedFruitBasket);
    }
  );

  itIf(guard.hasExports, "should list the sanitized fruit basket", () => {
    const newBasket = fruitBasket.filter((fruit) => fruit !== "lemon");
    const expected = `My mom bought me a fruit basket containing ${newBasket.join(
      ", "
    )}!`;

    expect(sanitizeFruitBasket(fruitBasket, "lemon")).toBe(expected);
  });
});
