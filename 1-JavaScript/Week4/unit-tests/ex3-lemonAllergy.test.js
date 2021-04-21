/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('sanitizeFruitBasket', () => {
  let exported, rootNode, sanitizeFruitBasket, fruitBasket, savedFruitBasket;

  const state = { selectRandomlyArgs: [] };

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));
    if (!exported) return;

    ({ sanitizeFruitBasket, fruitBasket } = exported);
    savedFruitBasket = [...fruitBasket];

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ property }) {
          if (property.name === 'filter') {
            state.filter = true;
          }
        },
      });
  });

  test('should exist and be executable', () => {
    if (!exported) return;
    expect(exported).toBeDefined();
  });

  test('should take two parameters', () => {
    if (!exported) return;
    expect(sanitizeFruitBasket).toHaveLength(2);
  });

  test('should use `filter`', () => {
    if (!exported) return;
    expect(state.filter).toBeDefined();
  });

  test('should not modify the original `fruitBasket` array', () => {
    if (!exported) return;
    expect(fruitBasket).toEqual(savedFruitBasket);
  });

  test('should list the sanitized fruit basket', () => {
    if (!exported) return;
    const newBasket = fruitBasket.filter((fruit) => fruit !== 'lemon');
    const expected = `My mom bought me a fruit basket containing ${newBasket.join(
      ', '
    )}!`;

    expect(sanitizeFruitBasket(fruitBasket, 'lemon')).toBe(expected);
  });
});
