/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  findAncestor,
} = require('../../../test-runner/unit-test-helpers');

describe('doubleEvenNumbers', () => {
  let exported, rootNode, doubleEvenNumbers;
  const state = {};

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));

    doubleEvenNumbers = exported;

    // Look for `map` and `filter` calls inside the
    // scope of the `doubleEvenNumber` function
    rootNode &&
      walk.ancestor(rootNode, {
        MemberExpression({ property }, ancestors) {
          if (['map', 'filter'].includes(property.name)) {
            const ancestor = findAncestor('FunctionDeclaration', ancestors);
            if (ancestor && ancestor.id.name === 'doubleEvenNumbers') {
              state[property.name] = true;
            }
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should return doubled even numbers only', () => {
    if (!exported) return;
    expect(doubleEvenNumbers([1, 2, 3, 4])).toEqual([4, 8]);
  });

  test('should use `map`', () => {
    if (!exported) return;
    expect(state.map).toBeDefined();
  });

  test('should use `filter`', () => {
    if (!exported) return;
    expect(state.filter).toBeDefined();
  });
});
