"use strict";

const {
  validateCreditCardNumber,
} = require("../homework/creditNumberValidator");

describe("validateCreditCardNumber", () => {
  it("should accept 9999777788880000", () => {
    expect(validateCreditCardNumber("9999777788880000")).toBe(true);
  });
  it("should accept 6666666666661666", () => {
    expect(validateCreditCardNumber("6666666666661666")).toBe(true);
  });
  it("should reject a92332119c011112", () => {
    expect(validateCreditCardNumber("a92332119c011112")).toBe(false);
  });
  it("should reject 4444444444444444", () => {
    expect(validateCreditCardNumber("4444444444444444")).toBe(false);
  });
  it("should reject 1111111111111110", () => {
    expect(validateCreditCardNumber("1111111111111110")).toBe(false);
  });
  it("should reject 6666666666666661", () => {
    expect(validateCreditCardNumber("6666666666666661")).toBe(false);
  });
});
