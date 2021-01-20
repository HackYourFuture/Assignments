/* eslint-disable hyf/camelcase */
"use strict";
const walk = require("acorn-walk");
const {
  beforeAllHelper,
  findAncestor,
  itIf,
  createGuard,
} = require("../../../test-automation/unit-test-helpers");

const guard = createGuard();

describe("giveCompliment", () => {
  let giveCompliment;
  const state = {};

  beforeAll(() => {
    const { exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    guard.setExports(exported);
    giveCompliment = exported;

    walk.ancestor(rootNode, {
      VariableDeclarator({ id, init }, ancestors) {
        if (
          id &&
          id.name === "compliments" &&
          init &&
          init.type === "ArrayExpression"
        ) {
          state.compliments = init.elements.map((elem) => elem.value);
          const ancestor = findAncestor("FunctionDeclaration", ancestors);
          if (ancestor && ancestor.id.name === "giveCompliment") {
            state.inScope = true;
          }
        }
      },
    });
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(guard.hasExports, "should take a single parameter", () => {
    expect(giveCompliment).toHaveLength(1);
  });

  itIf(
    guard.hasExports,
    "should include a `compliments` array initialized with 10 strings",
    () => {
      expect(state.compliments ? "" : "No such array found").toBe("");
      expect(
        state.compliments.length === 10 ? "" : "Array is not of length 10"
      ).toBe("");
      const isAllStrings = state.compliments.every(
        (compliment) => typeof compliment === "string"
      );
      expect(isAllStrings ? "" : "Not all elements are strings").toBe("");
    }
  );

  itIf(
    guard.hasExports,
    "should give a random compliment: You are `compliment`, `name`!",
    () => {
      expect(state.compliments).toBeDefined();

      const name = "HackYourFuture";

      const spy = jest.spyOn(Math, "random").mockReturnValue(0);
      const received = giveCompliment(name);

      expect(spy.mock.calls.length > 0 ? "" : "compliment is not random").toBe(
        ""
      );
      spy.mockRestore();

      const [compliment] = state.compliments;
      expect(received).toBe(`You are ${compliment}, ${name}!`);
    }
  );
});
