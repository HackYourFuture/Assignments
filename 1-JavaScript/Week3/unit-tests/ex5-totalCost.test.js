/* eslint-disable hyf/camelcase */
"use strict";
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("calculateTotalPrice", () => {
  let calculateTotalPrice;
  let cartForParty;

  beforeAll(() => {
    const { exports } = beforeAllHelper(__filename, {
      parse: true,
    });
    ({ calculateTotalPrice, cartForParty } = exports);
  });

  it("should be a function taking one parameter", () => {
    expect(typeof calculateTotalPrice).toBe("function");
    expect(calculateTotalPrice).toHaveLength(1);
  });

  it("cartForParty should contain five grocery items with prices", () => {
    expect(typeof cartForParty).toBe("object");
    expect(Object.keys(cartForParty)).toHaveLength(5);
    expect(
      Object.values(cartForParty).every((value) => typeof value === "number")
    ).toBe(true);
  });

  it("should return the total price in Euros", () => {
    expect(typeof cartForParty).toBe("object");
    expect(typeof calculateTotalPrice === "function").toBe(true);

    const total = Object.values(cartForParty).reduce(
      (sum, price) => sum + price,
      0
    );

    const result = calculateTotalPrice(cartForParty);
    expect(result).toBeDefined();
    expect(result).toBe(`Total: €${total.toFixed(2)}`);
  });
});
