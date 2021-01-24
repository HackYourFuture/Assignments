/* eslint-disable hyf/camelcase */
const walk = require("acorn-walk");
const {
  prepare,
  validateHTML,
  deleteFiles,
} = require("../../../test-runner/puppeteer-helpers");
const { beforeAllHelper } = require("../../../test-runner/unit-test-helpers");

describe("catWalk", () => {
  let rootNode;
  const state = {};

  beforeAll(async () => {
    await prepare(page);
    ({ rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (
            object.type === "Identifier" &&
            object.name === "window" &&
            property.type === "Identifier"
          ) {
            if (["onload", "addEventListener"].includes(property.name)) {
              state.onload = true;
            }
          }
        },
        CallExpression({ callee }) {
          if (callee.type === "Identifier" && callee.name === "setInterval") {
            state.setInterval = true;
          }
        },
      });
  });

  afterAll(() => {
    deleteFiles();
  });

  it("should be syntactically valid", validateHTML);

  it("should use `setInterval()`", () => {
    expect(state.setInterval).toBeDefined();
  });

  it("should use `window.onload` or `window.addEventListener`", () => {
    expect(state.onload).toBeDefined();
  });
});
