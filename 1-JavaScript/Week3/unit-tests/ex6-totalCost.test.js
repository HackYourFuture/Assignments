/* eslint-disable hyf/camelcase */
'use strict';
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('calculateTotalPrice', () => {
  let exported, calculateTotalPrice, cartForParty;

  beforeAll(() => {
    ({ exported } = beforeAllHelper(__filename));
    if (!exported) return;
    ({ calculateTotalPrice, cartForParty } = exported);
  });

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should be a function taking one parameter', () => {
    if (!exported) return;
    expect(typeof calculateTotalPrice).toBe('function');
    expect(calculateTotalPrice).toHaveLength(1);
  });

  it('cartForParty should contain five grocery items with prices', () => {
    if (!exported) return;
    expect(typeof cartForParty).toBe('object');
    expect(Object.keys(cartForParty)).toHaveLength(5);
    expect(
      Object.values(cartForParty).every((value) => typeof value === 'number')
    ).toBe(true);
  });

  it('should return the total price in Euros', () => {
    if (!exported) return;
    expect(typeof cartForParty).toBe('object');
    expect(typeof calculateTotalPrice === 'function').toBe(true);

    const total = Object.values(cartForParty).reduce(
      (sum, price) => sum + price,
      0
    );

    const result = calculateTotalPrice(cartForParty);
    expect(result).toBeDefined();
    expect(result).toBe(`Total: €${total.toFixed(2)}`);
  });
});
