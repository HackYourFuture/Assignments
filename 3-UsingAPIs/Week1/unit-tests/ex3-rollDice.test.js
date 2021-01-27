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
      });
  });

  it('should call `new Promise()`', () => {
    expect(state.newPromise).toBeDefined();
  });
});
