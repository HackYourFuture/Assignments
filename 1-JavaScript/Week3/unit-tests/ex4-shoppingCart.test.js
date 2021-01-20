"use strict";
const {
  beforeAllHelper,
  itIf,
  createGuard,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("addToShoppingCart", () => {
  let addToShoppingCart, shoppingCart;

  beforeAll(() => {
    const { exported } = beforeAllHelper(__filename);
    guard.setExports(exported);
    if (!exported) return;
    ({ shoppingCart, addToShoppingCart } = exported);
    // re-initialize the array referenced by the global var `shoppingCart'
    // to its initially expected values
    Array.isArray(shoppingCart) &&
      shoppingCart.splice(0, shoppingCart.length, "bananas", "milk");
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should add chocolate", () => {
    expect(addToShoppingCart("chocolate")).toBe(
      "You bought bananas, milk, chocolate!"
    );
  });

  itIf(guard.hasExports, "should remove bananas after adding waffles", () => {
    expect(addToShoppingCart("waffles")).toBe(
      "You bought milk, chocolate, waffles!"
    );
  });

  itIf(guard.hasExports, "should remove milk after adding tea", () => {
    expect(addToShoppingCart("tea")).toBe(
      "You bought chocolate, waffles, tea!"
    );
  });
});
