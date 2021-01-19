/* eslint-disable hyf/camelcase */
const walk = require("acorn-walk");
const {
  prepare,
  validateHTML,
  deleteFiles,
} = require("../../../test-automation/puppeteer-helpers");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("whatsTheTime", () => {
  const state = {};

  beforeAll(async () => {
    await prepare(page);
    const { rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    });

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
