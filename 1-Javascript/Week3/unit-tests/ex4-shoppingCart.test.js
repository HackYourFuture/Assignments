"use strict";

function expectedReceived(expected, received) {
  if (expected === received) {
    return "";
  }
  return `\nExpected: ${expected}\nReceived: ${received}`;
}

describe("addToShoppingCart", () => {
  let logSpy;
  let addToShoppingCart;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ addToShoppingCart } = require("../homework/ex4-shoppingCart"));
    spy.mockRestore();
  });

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('addToShoppingCart("chocolate")', () => {
    addToShoppingCart("chocolate");
    expect(logSpy).toHaveBeenCalled();

    const message = expectedReceived(
      "You bought bananas, milk, chocolate!",
      logSpy.mock.calls[0][0]
    );
    expect(message).toBe("");
  });

  it('addToShoppingCart("waffles")', () => {
    addToShoppingCart("waffles");
    expect(logSpy).toHaveBeenCalled();

    const message = expectedReceived(
      "You bought milk, chocolate, waffles!",
      logSpy.mock.calls[0][0]
    );
    expect(message).toBe("");
  });

  it('addToShoppingCart("tea")', () => {
    addToShoppingCart("tea");
    expect(logSpy).toHaveBeenCalled();

    const message = expectedReceived(
      "You bought chocolate, waffles, tea!",
      logSpy.mock.calls[0][0]
    );
    expect(message).toBe("");
  });
});
