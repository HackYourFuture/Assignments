/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  checkTodos,
} = require('../../../test-runner/unit-test-helpers');

describe('ex4-pokerDiceAll', () => {
  const state = {};
  let exported, rootNode, source, rollTheDices;

  beforeAll(() => {
    ({ exported, rootNode, source } = beforeAllHelper(__filename, {
      parse: true,
    }));
    rollTheDices = exported;

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (object.name === 'Promise' && property.name === 'all') {
            state.promiseAll = true;
          } else if (object.name === 'dices' && property.name === 'map') {
            state.dicesMap = true;
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should have all TODO comments removed', () => checkTodos(source));

  test('should use `dices.map()`', () => {
    expect(state.dicesMap).toBeDefined();
  });

  test('should use `Promise.all()`', () => {
    expect(state.promiseAll).toBeDefined();
  });

  test('should resolve when all dices settle successfully', async () => {
    expect.assertions(4);
    expect(exported).toBeDefined();

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    const promise = rollTheDices();
    expect(promise).toBeInstanceOf(Promise);
    const result = await promise;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(5);

    promise.finally(() => {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    });
  });

  test('should reject with an Error when a dice rolls off the table', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    try {
      const promise = rollTheDices();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    }
  });
});
