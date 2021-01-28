/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  findAncestor,
} = require('../../../test-runner/unit-test-helpers');

describe('addToShoppingCart', () => {
  const state = {};
  let exported, rootNode, addToShoppingCart;

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));
    addToShoppingCart = exported;

    rootNode &&
      walk.ancestor(rootNode, {
        SpreadElement(_, ancestors) {
          const ancestor = findAncestor('ArrayExpression', ancestors);
          if (ancestor) {
            state.spreadInArray = true;
          }
        },
      });
  });

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should be a function that takes two parameters', () => {
    expect(exported).toBeDefined();
    expect(typeof addToShoppingCart === 'function').toBe(true);
    expect(addToShoppingCart).toHaveLength(2);
  });

  it('should use spread syntax (...) inside an array', () => {
    expect(exported).toBeDefined();
    expect(state.spreadInArray).toBeDefined();
  });

  it("should not modify ('mutate') its arguments", () => {
    expect(typeof addToShoppingCart === 'function').toBe(true);
    const cart = ['bananas', 'milk'];
    const original = [...cart];
    addToShoppingCart(cart, 'chocolate');
    expect(cart).toEqual(original);
  });

  it('should return a new array with new the item addded while taking out older items if items > 3', () => {
    expect(typeof addToShoppingCart === 'function').toBe(true);
    const cart = ['bananas', 'milk'];
    let newCart = addToShoppingCart(cart, 'chocolate');
    newCart = addToShoppingCart(newCart, 'waffles');
    newCart = addToShoppingCart(newCart, 'tea');
    expect(Array.isArray(newCart)).toBe(true);
    expect(newCart).toHaveLength(3);
    expect(newCart).toContain('chocolate');
    expect(newCart).toContain('waffles');
    expect(newCart).toContain('tea');
  });
});
