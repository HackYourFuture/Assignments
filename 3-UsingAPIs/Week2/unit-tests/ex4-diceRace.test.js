/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  checkTodos,
} = require('../../../test-runner/unit-test-helpers');

describe('ex4-diceRace', () => {
  const state = {};
  let exported, rootNode, source, rollTheDice;

  beforeAll(() => {
    ({ exported, rootNode, source } = beforeAllHelper(__filename, {
      parse: true,
    }));
    rollTheDice = exported;

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (object.name === 'Promise' && property.name === 'race') {
            state.promiseAll = true;
          } else if (object.name === 'dice' && property.name === 'map') {
            state.diceMap = true;
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should have all TODO comments removed', () => checkTodos(source));

  test('should use `dice.map()`', () => {
    expect(state.diceMap).toBeDefined();
  });

  test('should use `Promise.race()`', () => {
    expect(state.promiseAll).toBeDefined();
  });

  test('should resolve as soon as a die settles successfully', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const promise = rollTheDice();
    expect(promise).toBeInstanceOf(Promise);
    const result = await promise;
    expect(typeof result).toBe('string');

    promise.finally(() => {
      randomSpy.mockRestore();
    });
  });

  test('should reject with an Error as soon as a die rolls off the table', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);

    try {
      const promise = rollTheDice();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
