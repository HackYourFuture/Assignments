"use strict";
const acorn = require("acorn");
const walk = require("acorn-walk");

const numChildren = [1, 2, 3];
const partnerNames = ["Marianne", "Sylvia", "Jane"];
const locations = ["Amsterdam", "London", "Paris"];
const jobs = ["engineer", "consultant", "programmer"];

describe("tellFortune", () => {
  let tellFortune;
  let rootNode;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ tellFortune } = require("../homework/ex3-tellFortune"));
    spy.mockRestore();
    const source = tellFortune.toString();
    rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  });

  it("should take four parameters", () => {
    const found = walk.findNodeAfter(rootNode, 0, (type, node) => {
      return type === "FunctionDeclaration" && node.id.name === "tellFortune";
    });
    expect(found).toBeDefined();
    expect(found.node.params).toHaveLength(4);
  });

  it("should tell a random fortune", () => {
    const mathRandomSpy = jest
      .spyOn(global.Math, "random")
      .mockReturnValue(0.9999);
    expect(tellFortune(numChildren, partnerNames, locations, jobs)).toBe(
      "You will be a programmer in Paris, married to Jane with 3 kids."
    );
    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();
  });
});
