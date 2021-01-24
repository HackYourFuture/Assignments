"use strict";
const { beforeAllHelper } = require("../../../test-runner/unit-test-helpers");

describe("calculateDogAge", () => {
  let exported, calculateDogAge;

  beforeAll(() => {
    ({ exported } = beforeAllHelper(__filename));
    calculateDogAge = exported;
  });

  it("should exist and be executable", () => {
    expect(exported).toBeDefined();
  });

  it("should take a single parameter", () => {
    if (!exported) return;
    expect(calculateDogAge).toHaveLength(1);
  });

  it("should give 7 dog years for 1 human year", () => {
    if (!exported) return;
    expect(calculateDogAge(1)).toBe("Your doggie is 7 years old in dog years!");
  });

  it("should give 14 dog years for 2 human years", () => {
    if (!exported) return;
    expect(calculateDogAge(2)).toBe(
      "Your doggie is 14 years old in dog years!"
    );
  });

  it("give 21 dog years for 3 human years", () => {
    if (!exported) return;
    expect(calculateDogAge(3)).toBe(
      "Your doggie is 21 years old in dog years!"
    );
  });
});
