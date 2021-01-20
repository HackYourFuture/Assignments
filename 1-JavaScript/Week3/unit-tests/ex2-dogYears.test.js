"use strict";
const {
  beforeAllHelper,
  itIf,
  createGuard,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("calculateDogAge", () => {
  let calculateDogAge;

  beforeAll(() => {
    const { exported } = beforeAllHelper(__filename);
    guard.setExports(exported);
    calculateDogAge = exported;
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should take a single parameter", () => {
    expect(calculateDogAge).toHaveLength(1);
  });

  itIf(guard.hasExports, "should give 7 dog years for 1 human year", () => {
    expect(calculateDogAge(1)).toBe("Your doggie is 7 years old in dog years!");
  });

  itIf(guard.hasExports, "should give 14 dog years for 2 human years", () => {
    expect(calculateDogAge(2)).toBe(
      "Your doggie is 14 years old in dog years!"
    );
  });

  itIf(guard.hasExports, "give 21 dog years for 3 human years", () => {
    expect(calculateDogAge(3)).toBe(
      "Your doggie is 21 years old in dog years!"
    );
  });
});
