/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const {
  beforeAllHelper,
  findAncestor,
} = require('../../../test-runner/unit-test-helpers');

describe('dogPhotos', () => {
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
      walk.ancestor(rootNode, {
        MemberExpression({ object, property }, ancestors) {
          if (object.type !== 'Identifier') {
            return;
          }
          if (object.name === 'axios') {
            if (property.type === 'Identifier') {
              state.axios = { method: property.name, scope: 'global' };
              const functionDeclaration = findAncestor(
                'FunctionDeclaration',
                ancestors
              );
              if (functionDeclaration) {
                state.axios.scope = 'function';
              }
            }
          }
        },
        TryStatement({ handler }) {
          if (handler.type === 'CatchClause') {
            state.tryCatch = true;
          }
        },
        FunctionDeclaration({ async }) {
          if (async) {
            state.async = true;
          }
        },
        AwaitExpression() {
          state.await = true;
        },
      });
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  it('should use `axios` inside a function', () => {
    expect(state.axios).toBeDefined();
    expect(state.axios.scope).toBe('function');
  });

  it('should use async/wait', () => {
    expect(state.async).toBeDefined();
    expect(state.await).toBeDefined();
  });

  it('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
