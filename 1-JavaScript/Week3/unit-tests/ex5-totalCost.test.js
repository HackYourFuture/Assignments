/* eslint-disable hyf/camelcase */
"use strict";
const {
  itIf,
  beforeAllHelper,
  createGuard,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("calculateTotalPrice", () => {
  let calculateTotalPrice, cartForParty;

  beforeAll(() => {
    const { exported } = beforeAllHelper(__filename);
    guard.setExports(exported);
    ({ calculateTotalPrice, cartForParty } = exported);
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should be a function taking one parameter", () => {
    expect(typeof calculateTotalPrice).toBe("function");
    expect(calculateTotalPrice).toHaveLength(1);
  });

  itIf(
    guard.hasExports,
    "cartForParty should contain five grocery items with prices",
    () => {
      expect(typeof cartForParty).toBe("object");
      expect(Object.keys(cartForParty)).toHaveLength(5);
      expect(
        Object.values(cartForParty).every((value) => typeof value === "number")
      ).toBe(true);
    }
  );

  itIf(guard.hasExports, "should return the total price in Euros", () => {
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
