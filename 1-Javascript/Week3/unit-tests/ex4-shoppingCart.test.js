"use strict";
const path = require("path");
const {
  expectedReceived,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(__dirname, "../homework/ex4-shoppingCart.js");

describe("addToShoppingCart", () => {
  let logSpy;

  beforeAll(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
    // All calls to console.log happen at require time for this exercise
    require(exercisePath);
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it("should console.log three lines with the expected output", () => {
    const expected = [
      "You bought bananas, milk, chocolate!",
      "You bought milk, chocolate, waffles!",
      "You bought chocolate, waffles, tea!",
    ].join("\n");

    const calls = logSpy.mock.calls.length;
    if (calls !== 3) {
      expect("\n" + expected).toBe("");
    }

    const received = [
      logSpy.mock.calls[0][0],
      logSpy.mock.calls[1][0],
      logSpy.mock.calls[2][0],
    ].join("\n");

    const message = expectedReceived(expected, received);
    expect(message).toBe("");
  });
});
