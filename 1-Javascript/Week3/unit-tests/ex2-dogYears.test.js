"use strict";

describe("calculateDogAge", () => {
  let calculateDogAge;
  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ calculateDogAge } = require("../homework/ex2-dogYears"));
    spy.mockRestore();
  });

  it("(1) should return `Your doggie is 7 years old in dog years!`", () => {
    expect(calculateDogAge(1)).toBe("Your doggie is 7 years old in dog years!");
  });

  it("(2) should return `Your doggie is 14 years old in dog years!`", () => {
    expect(calculateDogAge(2)).toBe(
      "Your doggie is 14 years old in dog years!"
    );
  });

  it("(3) should return `Your doggie is 21 years old in dog years!`", () => {
    expect(calculateDogAge(3)).toBe(
      "Your doggie is 21 years old in dog years!"
    );
  });
});
