/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('rollTheDices', () => {
  const state = {};
  let rootNode;

  beforeAll(() => {
    ({ rootNode } = beforeAllHelper(__filename, {
      parse: true,
      noRequire: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (object.name === 'Promise' && property.name === 'all') {
            state.promiseAll = true;
          }
        },
      });
  });

  it('should use `Promise.all()`', () => {
    expect(state.promiseAll).toBeDefined();
  });
});
