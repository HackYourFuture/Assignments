"use strict";
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("calculateDogAge", () => {
  let calculateDogAge;

  beforeAll(() => {
    const { exports } = beforeAllHelper(__filename);
    calculateDogAge = exports;
  });

  it("should take a single parameter", () => {
    expect(calculateDogAge).toHaveLength(1);
  });

  it("should give 7 dog years for 1 human year", () => {
    expect(calculateDogAge(1)).toBe("Your doggie is 7 years old in dog years!");
  });

  it("should give 14 dog years for 2 human years", () => {
    expect(calculateDogAge(2)).toBe(
      "Your doggie is 14 years old in dog years!"
    );
  });

  it("give 21 dog years for 3 human years", () => {
    expect(calculateDogAge(3)).toBe(
      "Your doggie is 21 years old in dog years!"
    );
  });
});
