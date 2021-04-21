/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('ex4-pokerDiceAll', () => {
  const state = {};
  let exported, rootNode, rollTheDices;

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      nukeTimers: true,
      zeroRandom: true,
      parse: true,
    }));
    rollTheDices = exported;

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (object.name === 'Promise' && property.name === 'all') {
            state.promiseAll = true;
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should use `Promise.all()`', () => {
    if (!exported) return;
    expect(state.promiseAll).toBeDefined();
  });

  test('should resolve when all dices settle successfully', () => {
    if (!exported) return;
    expect.assertions(2);

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    const promise = rollTheDices();
    expect(promise).toBeInstanceOf(Promise);
    const assertionPromise = expect(promise).resolves.toBeDefined();

    promise.finally(() => {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    });

    return assertionPromise;
  });

  test('should reject with an Error when a dice rolls off the table', async () => {
    if (!exported) return;
    expect.assertions(2);

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
