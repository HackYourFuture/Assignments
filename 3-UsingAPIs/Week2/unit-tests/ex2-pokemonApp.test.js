/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const {
  beforeAllHelper,
  testTodosRemoved,
} = require('../../../test-runner/unit-test-helpers');

describe('pokemonApp', () => {
  const state = {};
  let rootNode, source;

  beforeAll(async () => {
    const { document } = await prepare();
    state.outerHTML = document.documentElement.outerHTML;
    ({ rootNode, source } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        CallExpression({ callee }) {
          if (callee.name === 'fetch') {
            state.fetch = true;
          }
        },
        TryStatement({ handler }) {
          if (handler.type === 'CatchClause') {
            state.tryCatch = true;
          }
        },
        AwaitExpression() {
          state.awaitFetch = true;
        },
      });
  });

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML));

  testTodosRemoved(() => source);

  test('should use `fetch()`', () => {
    expect(state.fetch).toBeDefined();
  });

  test('should use `await fetch()`', () => {
    expect(state.awaitFetch).toBeDefined();
  });

  test('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
