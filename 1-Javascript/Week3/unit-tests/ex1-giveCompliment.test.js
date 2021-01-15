"use strict";
const acorn = require("acorn");
const walk = require("acorn-walk");

describe("giveCompliment", () => {
  let giveCompliment;
  let rootNode;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ giveCompliment } = require("../homework/ex1-giveCompliment"));
    spy.mockRestore();
    const source = giveCompliment.toString();
    rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  });

  it("should contain a `const` array named `compliments` with 10 strings", () => {
    const found = walk.findNodeAfter(rootNode, 0, (type, node) => {
      return (
        type === "VariableDeclarator" &&
        node.id.name === "compliments" &&
        node.init &&
        node.init.type === "ArrayExpression"
      );
    });

    expect(found).toBeDefined();
    expect(found.node.init.type).toBe("ArrayExpression");
    expect(found.node.init.elements).toHaveLength(10);
    expect(
      found.node.init.elements.every((elem) => typeof elem.value === "string")
    ).toBe(true);
  });

  it("should give a random compliment: You are `compliment`, `name`!", () => {
    const found = walk.findNodeAfter(rootNode, 0, (type, node) => {
      return (
        type === "VariableDeclarator" &&
        node.id.name === "compliments" &&
        node.init &&
        node.init.type === "ArrayExpression"
      );
    });

    expect(found).toBeDefined();

    const compliments = found.node.init.elements.map((elem) => elem.value);
    const compliment = compliments[0];

    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0);
    const received = giveCompliment("Nancy");

    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();

    const expected = `You are ${compliment}, Nancy!`;
    const message =
      received === expected
        ? ""
        : `\n  Expected: ${expected}\n  Received: ${received}`;
    expect(message).toBe("");
  });
});
