/* eslint-disable hyf/camelcase */
"use strict";
const path = require("path");
const walk = require("acorn-walk");

const {
  beforeAllHelper,
  expectedReceived,
} = require("../../../test-automation/unit-test-helpers");

const exercisePath = path.join(__dirname, "../homework/ex3-tellFortune.js");

describe("tellFortune", () => {
  let tellFortune;
  const state = {};

  beforeAll(() => {
    const { exportedFunction, rootNode } = beforeAllHelper(exercisePath, {
      parse: true,
    });
    tellFortune = exportedFunction;
    walk.simple(rootNode, {
      VariableDeclarator({ id, init }) {
        if (id && init && init.type === "ArrayExpression") {
          state[id.name] = init.elements
            .filter((elem) => elem.type === "Literal")
            .map((elem) => elem.value);
        }
      },
    });
  });

  it("should take four parameters", () => {
    expect(tellFortune).toHaveLength(4);
  });

  it("Variable `numKids` should be an array containing five strings", () => {
    expect(Array.isArray(state.numKids)).toBe(true);
    expect(state.numKids).toHaveLength(5);
  });

  it("Variable `partnerNames` should be an array containing five strings", () => {
    expect(Array.isArray(state.partnerNames)).toBe(true);
    expect(state.partnerNames).toHaveLength(5);
  });

  it("Variable `locations` should be an array containing five strings", () => {
    expect(Array.isArray(state.locations)).toBe(true);
    expect(state.locations).toHaveLength(5);
  });

  it("Variable `jobs` should be an array containing five strings", () => {
    expect(Array.isArray(state.jobs)).toBe(true);
    expect(state.jobs).toHaveLength(5);
  });

  it("should fortune-tell by randomly selecting values from the arrays", () => {
    const { numKids, partnerNames, locations, jobs } = state;
    const mathRandomSpy = jest.spyOn(global.Math, "random").mockReturnValue(0);
    const received = tellFortune(numKids, partnerNames, locations, jobs);
    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();

    const message = expectedReceived(
      `You will be a ${jobs[0]} in ${locations[0]}, married to ${partnerNames[0]} with ${numKids[0]} kids.`,
      received
    );
    expect(message).toBe("");
  });
});
