"use strict";
const path = require("path");
const {
  beforeAllHelper,
  expectedReceived,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(__dirname, "../homework/ex2-dogYears.js");

describe("calculateDogAge", () => {
  let calculateDogAge;

  beforeAll(() => {
    const { exportedFunction } = beforeAllHelper(exercisePath);
    calculateDogAge = exportedFunction;
  });

  it("(1) should return `Your doggie is 7 years old in dog years!`", () => {
    const message = expectedReceived(
      "Your doggie is 7 years old in dog years!",
      calculateDogAge(1)
    );
    expect(message).toBe("");
  });

  it("(2) should return `Your doggie is 14 years old in dog years!`", () => {
    const message = expectedReceived(
      "Your doggie is 14 years old in dog years!",
      calculateDogAge(2)
    );
    expect(message).toBe("");
  });

  it("(3) should return `Your doggie is 21 years old in dog years!`", () => {
    const message = expectedReceived(
      "Your doggie is 21 years old in dog years!",
      calculateDogAge(3)
    );
    expect(message).toBe("");
  });
});
