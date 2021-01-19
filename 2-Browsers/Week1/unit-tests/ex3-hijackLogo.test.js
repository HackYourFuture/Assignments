/* eslint-disable hyf/camelcase */
const walk = require("acorn-walk");
const {
  beforeAllHelper,
} = require("../../../test-automation/unit-test-helpers");

describe("hijackLogo", () => {
  const state = {};

  beforeAll(() => {
    const { rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    });

    walk.simple(rootNode, {
      MemberExpression({ property }) {
        if (["src", "srcset"].includes(property.name)) {
          state[property.name] = true;
        }
      },
    });
  });

  it("should set the `src` property", () => {
    expect(state.src).toBeDefined();
  });

  it("should set the `srcset` property", () => {
    expect(state.srcset).toBeDefined();
  });
});
