'use strict';
const {
  beforeAllHelper,
  checkTodos,
} = require('../../../test-runner/unit-test-helpers');

describe('calculateDogAge', () => {
  let exported, source, calculateDogAge;

  beforeAll(() => {
    ({ exported, source } = beforeAllHelper(__filename));
    calculateDogAge = exported;
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should have all TODO comments removed', () => checkTodos(source));

  test('should take a single parameter', () => {
    expect(exported).toBeDefined();
    expect(calculateDogAge).toHaveLength(1);
  });

  test('should give 7 dog years for 1 human year', () => {
    expect(exported).toBeDefined();
    expect(calculateDogAge(1)).toBe('Your doggie is 7 years old in dog years!');
  });

  test('should give 14 dog years for 2 human years', () => {
    expect(exported).toBeDefined();
    expect(calculateDogAge(2)).toBe(
      'Your doggie is 14 years old in dog years!'
    );
  });

  test('give 21 dog years for 3 human years', () => {
    expect(exported).toBeDefined();
    expect(calculateDogAge(3)).toBe(
      'Your doggie is 21 years old in dog years!'
    );
  });
});
