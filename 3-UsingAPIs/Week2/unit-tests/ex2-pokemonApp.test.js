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
        AwaitExpression({ argument }) {
          if (argument.type !== 'CallExpression') {
            return;
          }
          const { callee } = argument;
          if (callee?.name === 'fetch') {
            state.awaitFetch = true;
          }
        },
        TryStatement({ handler }) {
          if (handler.type === 'CatchClause') {
            state.tryCatch = true;
          }
        },
      });
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  it('should use `await fetch()`', () => {
    expect(state.awaitFetch).toBeDefined();
  });

  it('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
