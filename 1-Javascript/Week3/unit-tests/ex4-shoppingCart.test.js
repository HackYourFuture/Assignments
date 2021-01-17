"use strict";
const path = require("path");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(__dirname, "../homework/ex4-shoppingCart.js");

describe("addToShoppingCart", () => {
  let shoppingCart;
  let addToShoppingCart;

  beforeAll(() => {
    const { exports } = beforeAllHelper(exercisePath);
    ({ shoppingCart, addToShoppingCart } = exports);
    // re-initialize the array referenced by the global var `shoppingCart'
    // to its initially expected values
    shoppingCart.splice(0, shoppingCart.length, "bananas", "milk");
  });

  it("should add chocolate", () => {
    expect(addToShoppingCart("chocolate")).toBe(
      "You bought bananas, milk, chocolate!"
    );
  });

  it("should remove bananas after adding waffles", () => {
    expect(addToShoppingCart("waffles")).toBe(
      "You bought milk, chocolate, waffles!"
    );
  });

  it("should remove milk after adding tea", () => {
    expect(addToShoppingCart("tea")).toBe(
      "You bought chocolate, waffles, tea!"
    );
  });
});
