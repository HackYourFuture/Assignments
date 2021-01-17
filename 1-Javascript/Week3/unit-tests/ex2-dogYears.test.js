"use strict";
const path = require("path");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(__dirname, "../homework/ex2-dogYears.js");

describe("calculateDogAge", () => {
  let calculateDogAge;

  beforeAll(() => {
    const { exports } = beforeAllHelper(exercisePath);
    calculateDogAge = exports;
  });

  it("1 human year --> 7 dog years", () => {
    expect(calculateDogAge(1)).toBe("Your doggie is 7 years old in dog years!");
  });

  it("2 human years --> 14 dog years", () => {
    expect(calculateDogAge(2)).toBe(
      "Your doggie is 14 years old in dog years!"
    );
  });

  it("3 human years --> 21 dog years", () => {
    expect(calculateDogAge(3)).toBe(
      "Your doggie is 21 years old in dog years!"
    );
  });
});
