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

describe("createPublisher", () => {
  let createPublisher;
  const state = {};

  beforeAll(() => {
    const { exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    guard.setExports(exported);
    createPublisher = exported;

    // Look for `map` and `filter` calls inside the
    // scope of the `doubleEvenNumber` function
    walk.ancestor(rootNode, {
      MemberExpression({ property }, ancestors) {
        if (["map", "filter"].includes(property.name)) {
          const ancestor = findAncestor("FunctionDeclaration", ancestors);
          if (ancestor && ancestor.id.name === "doubleEvenNumbers") {
            state[property.name] = true;
          }
        }
      },
    });
  });

  it("should exist and be executable", () => {
    expect(guard.hasExports()).toBeTruthy();
  });

  itIf(
    guard.hasExports,
    "should return an object with `subscribe` and a `notify` function properties",
    () => {
      const myPublisher = createPublisher();
      expect(typeof myPublisher).toBe("object");
      expect(typeof myPublisher.subscribe).toBe("function");
      expect(typeof myPublisher.notify).toBe("function");
    }
  );

  itIf(
    guard.hasExports,
    "should notify all subscribers of any notification",
    () => {
      const myPublisher = createPublisher();
      expect(typeof myPublisher).toBe("object");
      expect(typeof myPublisher.subscribe).toBe("function");
      expect(typeof myPublisher.notify).toBe("function");

      const listener1 = jest.fn();
      const listener2 = jest.fn();

      myPublisher.subscribe(listener1);
      myPublisher.subscribe(listener2);

      myPublisher.notify("Hi!");

      expect(listener1).toHaveBeenCalledWith("Hi!");
      expect(listener2).toHaveBeenCalledWith("Hi!");
    }
  );
});
