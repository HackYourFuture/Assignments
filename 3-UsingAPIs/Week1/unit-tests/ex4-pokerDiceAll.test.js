/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  testTodosRemoved,
  testNoConsoleLog,
} = require('../../../test-runner/unit-test-helpers');

describe('ex4-pokerDiceAll', () => {
  const state = {};
  let exported, rootNode, source, rollDice;

  beforeAll(() => {
    ({ exported, rootNode, source } = beforeAllHelper(__filename, {
      parse: true,
    }));
    rollDice = exported;

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (object.name === 'Promise' && property.name === 'all') {
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

  testTodosRemoved(() => source);

  testNoConsoleLog('rollDice', () => rootNode);

  test('should use `dice.map()`', () => {
    expect(state.diceMap).toBeDefined();
  });

  test('should use `Promise.all()`', () => {
    expect(state.promiseAll).toBeDefined();
  });

  test('should resolve when all dice settle successfully', async () => {
    expect.assertions(4);
    expect(exported).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const promise = rollDice();
    expect(promise).toBeInstanceOf(Promise);
    const result = await promise;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(5);

    promise.finally(() => {
      randomSpy.mockRestore();
    });
  });

  test('should reject with an Error when a die rolls off the table', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);

    try {
      const promise = rollDice();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
