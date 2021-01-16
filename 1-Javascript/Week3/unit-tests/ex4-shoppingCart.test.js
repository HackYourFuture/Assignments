"use strict";
const path = require("path");
const {
  beforeAllHelper,
  expectedReceived,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(__dirname, "../homework/ex4-shoppingCart.js");

describe("addToShoppingCart", () => {
  let shoppingCart;
  let addToShoppingCart;

  beforeAll(() => {
    const { exports } = beforeAllHelper(exercisePath);
    ({ shoppingCart, addToShoppingCart } = exports);

    // re-initialize the array referenced by the global var `shoppingCart'
    shoppingCart.splice(0, shoppingCart.length, "bananas", "milk");
  });

  it("should add chocolate", () => {
    const received = addToShoppingCart("chocolate");
    const expected = "You bought bananas, milk, chocolate!";
    const message = expectedReceived(expected, received);
    expect(message).toBe("");
  });

  it("should remove bananas when adding waffles", () => {
    const received = addToShoppingCart("waffles");
    const expected = "You bought milk, chocolate, waffles!";
    const message = expectedReceived(expected, received);
    expect(message).toBe("");
  });

  it("should remove milk when adding tea", () => {
    const received = addToShoppingCart("tea");
    const expected = "You bought chocolate, waffles, tea!";
    const message = expectedReceived(expected, received);
    expect(message).toBe("");
  });
});
