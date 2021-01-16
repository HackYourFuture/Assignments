/* eslint-disable hyf/camelcase */
"use strict";
const fs = require("fs");
const path = require("path");
const acorn = require("acorn");
const walk = require("acorn-walk");

function expectedReceived(expected, received) {
  if (expected === received) {
    return "";
  }
  return `\nExpected: ${expected}\nReceived: ${received}`;
}

const exerciseRelativePath = "../homework/ex1-giveCompliment.js";

describe("giveCompliment", () => {
  let giveCompliment;
  let rootNode;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ giveCompliment } = require(exerciseRelativePath));
    spy.mockRestore();
    const source = fs.readFileSync(
      path.join(__dirname, exerciseRelativePath),
      "utf8"
    );
    rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  });

  it("should contain a `const` array named `compliments` with 10 strings", () => {
    const state = {};
    walk.simple(rootNode, {
      VariableDeclarator({ id, init }) {
        if (
          id &&
          id.name === "compliments" &&
          init &&
          init.type === "ArrayExpression"
        ) {
          state.compliments = init.elements.map((elem) => elem.value);
        }
      },
    });

    expect(state.compliments).toBeDefined();
    expect(state.compliments).toHaveLength(10);
    expect(
      state.compliments.every((compliment) => typeof compliment === "string")
    ).toBe(true);
  });

  it("should give a random compliment: You are `compliment`, `name`!", () => {
    const state = {
      name: "Jack",
    };
    walk.simple(rootNode, {
      VariableDeclarator({ id, init }) {
        if (
          id &&
          id.name === "compliments" &&
          init &&
          init.type === "ArrayExpression"
        ) {
          state.compliments = init.elements.map((elem) => elem.value);
        }
      },
      CallExpression({ callee, arguments: args }) {
        if (
          callee.type === "Identifier" &&
          callee.name === "giveCompliment" &&
          args.length > 0 &&
          args[0].type === "Literal"
        ) {
          state.name = args[0].value;
        }
      },
    });

    expect(state.compliments).toBeDefined();

    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0);
    const received = giveCompliment(state.name);
    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();

    const [compliment] = state.compliments;
    const message = expectedReceived(
      `You are ${compliment}, ${state.name}!`,
      received
    );
    expect(message).toBe("");
  });
});
