"use strict";
const acorn = require("acorn");
const walk = require("acorn-walk");

describe("doubleEvenNumbers", () => {
  let doubleEvenNumbers;
  let rootNode;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ doubleEvenNumbers } = require("../homework/ex1-doubleEvenNumbers"));
    spy.mockRestore();
    const source = doubleEvenNumbers.toString();
    rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  });

  it("should double even numbers only", () => {
    expect(doubleEvenNumbers([1, 2, 3, 4])).toEqual([4, 8]);
  });

  it("should `map`", () => {
    const found = walk.findNodeAfter(rootNode, 0, (type, node) => {
      return type === "MemberExpression" && node.property.name === "map";
    });
    expect(found).toBeDefined();
  });

  it("should use `filter`", () => {
    const found = walk.findNodeAfter(rootNode, 0, (type, node) => {
      return type === "MemberExpression" && node.property.name === "filter";
    });
    expect(found).toBeDefined();
  });
});
