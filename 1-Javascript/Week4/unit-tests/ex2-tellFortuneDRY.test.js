/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("tellFortune", () => {
  let tellFortune;
  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    const { exports, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    tellFortune = exports;

    walk.simple(rootNode, {
      VariableDeclarator({ id, init }) {
        if (id && init && init.type === "ArrayExpression") {
          state[id.name] = init.elements
            .filter((elem) => elem.type === "Literal")
            .map((elem) => elem.value);
        }
      },
      FunctionDeclaration(node) {
        if (node.id.name === "tellFortune") {
          state.tellFortuneParams = node.params.map((param) => param.name);
        }
      },
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "selectRandomly" &&
          node.arguments.length > 0
        ) {
          state.selectRandomlyArgs.push(node.arguments[0].name);
        }
      },
    });
  });

  it("should take four parameters", () => {
    expect(tellFortune).toHaveLength(4);
  });

  it("should call function `selectRandomly` for each of its arguments", () => {
    expect(state.selectRandomlyArgs).toBeDefined();
    expect(state.selectRandomlyArgs).toEqual(
      expect.arrayContaining(state.tellFortuneParams)
    );
  });

  it("should tell the fortune by randomly selecting values from the arrays", () => {
    const { numKids, partnerNames, locations, jobs } = state;
    expect(numKids).toBeDefined();
    expect(partnerNames).toBeDefined();
    expect(locations).toBeDefined();
    expect(jobs).toBeDefined();

    const mathRandomSpy = jest.spyOn(global.Math, "random").mockReturnValue(0);
    const received = tellFortune(numKids, partnerNames, locations, jobs);
    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();

    expect(received).toBe(
      `You will be a ${jobs[0]} in ${locations[0]}, married to ${partnerNames[0]} with ${numKids[0]} kids.`
    );
  });
});
