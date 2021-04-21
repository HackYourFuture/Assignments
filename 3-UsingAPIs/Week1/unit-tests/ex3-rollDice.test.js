/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('rollDice', () => {
  const state = {};
  let exported, rootNode, rollDice;

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      nukeTimers: true,
      zeroRandom: true,
      parse: true,
    }));
    rollDice = exported;

    rootNode &&
      walk.simple(rootNode, {
        NewExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'Promise') {
            state.newPromise = true;
          }
        },
        CallExpression({ callee, arguments: args }) {
          if (['resolve', 'reject'].includes(callee.name)) {
            state[callee.name] = args.length;
          }
        },
      });
  });

  test('should call `new Promise()`', () => {
    expect(state.newPromise).toBeDefined();
  });

  test('`resolve()` should be called with a one argument', () => {
    expect(state.resolve).toBe(1);
  });

  test('`reject()` should be called with a one argument', () => {
    expect(state.reject).toBe(1);
  });

  test('should resolve when the dice settles successfully', () => {
    if (!exported) return;
    expect.assertions(2);

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    const promise = rollDice();
    expect(promise).toBeInstanceOf(Promise);
    const assertionPromise = expect(promise).resolves.toBeDefined();

    promise.finally(() => {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    });

    return assertionPromise;
  });

  test('should reject with an Error when the dice rolls off the table', async () => {
    if (!exported) return;
    expect.assertions(2);

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    try {
      const promise = rollDice();
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
