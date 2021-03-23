/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('rollDice', () => {
  const state = {};
  let rootNode;

  beforeAll(() => {
    ({ rootNode } = beforeAllHelper(__filename, {
      parse: true,
      noRequire: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        NewExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'Promise') {
            state.newPromise = true;
          }
        },
        CallExpression({ callee, arguments: args }) {
          if (['resolve', 'reject'].includes(callee.name)) {
            state[callee.name] = args.length;
          }
        },
      });
  });

  it('should call `new Promise()`', () => {
    expect(state.newPromise).toBeDefined();
  });

  it('`resolve()` should be called with a one argument', () => {
    expect(state.resolve).toBe(1);
  });

  it('`reject()` should be called with a one argument', () => {
    expect(state.reject).toBe(1);
  });
});
