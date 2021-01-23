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

describe("ex1-promiseToWait", () => {
  const state = { asyncCount: 0, awaitCount: 0, tryCount: 0, catchCount: 0 };

  beforeAll(async () => {
    await prepare(page);
    const { rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    });

    walk.simple(rootNode, {
      FunctionDeclaration({ async }) {
        if (async) {
          state.asyncCount += 1;
        }
      },
      ArrowFunctionExpression({ async }) {
        if (async) {
          state.asyncCount += 1;
        }
      },
      AwaitExpression() {
        state.awaitCount += 1;
      },
      TryStatement() {
        state.tryCount += 1;
      },
      CatchClause() {
        state.catchCount += 1;
      },
    });
  });

  afterAll(() => {
    deleteFiles();
  });

  it("HTML should be syntactically valid", validateHTML);

  it("should use `async` twice", () => {
    expect(state.asyncCount).toBe(2);
  });

  it("should use `await` three times", () => {
    expect(state.awaitCount).toBe(3);
  });

  it("should use `try` twice", () => {
    expect(state.tryCount).toBe(2);
  });

  it("should use `catch` twice", () => {
    expect(state.catchCount).toBe(2);
  });
});
