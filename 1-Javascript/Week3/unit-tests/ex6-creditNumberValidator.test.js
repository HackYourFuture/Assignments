"use strict";
const path = require("path");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(
  __dirname,
  "../homework/ex6-creditNumberValidator.js"
);

describe("validateCreditNumber", () => {
  let validateCreditNumber;

  beforeAll(() => {
    const { exports } = beforeAllHelper(exercisePath);
    validateCreditNumber = exports;
  });

  it("should reject a92332119c011112 (invalid characters)", () => {
    expect(validateCreditNumber("a92332119c011112")).toBe(
      "Invalid! The input a92332119c011112 should contain only numbers!"
    );
  });

  it("should reject 4444444444444444 (all digits the same)", () => {
    expect(validateCreditNumber("4444444444444444")).toBe(
      "Invalid! The input 4444444444444444 should contain at least 2 different types of numbers!"
    );
  });

  it("should accept 6666666666661666 (valid)", () => {
    expect(validateCreditNumber("6666666666661666")).toBe(
      "Success! The input 6666666666661666 is a valid credit card number!"
    );
  });

  it("should reject 1111111111111110 (sum < 16)", () => {
    expect(validateCreditNumber("1111111111111110")).toEqual(
      expect.not.stringContaining("Success")
    );
  });

  it("should reject 6666666666666661 (final odd number)", () => {
    expect(validateCreditNumber("6666666666666661")).toEqual(
      expect.not.stringContaining("Success")
    );
  });

  it("should reject 6666666666666 (length !== 16)", () => {
    expect(validateCreditNumber("6666666666666")).toEqual(
      expect.not.stringContaining("Success")
    );
  });
});
