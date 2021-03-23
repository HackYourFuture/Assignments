/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('pokemonApp', () => {
  const state = {};
  let rootNode;

  beforeAll(async () => {
    const { document } = await prepare();
    state.outerHTML = document.documentElement.outerHTML;
    ({ rootNode } = beforeAllHelper(__filename, {
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

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  it('should use `fetch()`', () => {
    expect(state.fetch).toBeDefined();
  });

  it('should use `await fetch()`', () => {
    expect(state.awaitFetch).toBeDefined();
  });

  it('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
