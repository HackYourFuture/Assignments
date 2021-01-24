"use strict";
const { beforeAllHelper } = require("../../../test-runner/unit-test-helpers");

describe("addToShoppingCart", () => {
  let exported, addToShoppingCart, shoppingCart;

  beforeAll(() => {
    ({ exported } = beforeAllHelper(__filename));
    if (!exported) return;

    ({ shoppingCart, addToShoppingCart } = exported);
    // re-initialize the array referenced by the global var `shoppingCart'
    // to its initially expected values
    Array.isArray(shoppingCart) &&
      shoppingCart.splice(0, shoppingCart.length, "bananas", "milk");
  });

  it("should exist and be executable", () => {
    expect(exported).toBeDefined();
  });

  it("should add chocolate", () => {
    if (!exported) return;
    expect(addToShoppingCart("chocolate")).toBe(
      "You bought bananas, milk, chocolate!"
    );
  });

  it("should remove bananas after adding waffles", () => {
    if (!exported) return;
    expect(addToShoppingCart("waffles")).toBe(
      "You bought milk, chocolate, waffles!"
    );
  });

  it("should remove milk after adding tea", () => {
    if (!exported) return;
    expect(addToShoppingCart("tea")).toBe(
      "You bought chocolate, waffles, tea!"
    );
  });
});
