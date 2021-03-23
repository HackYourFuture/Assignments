/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

jest.useFakeTimers();

const isPromise = (obj) => typeof obj === 'object' && 'then' in obj;

describe('rollDice', () => {
  const state = {};
  let exported, rootNode, rollDice;

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
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

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should call `new Promise()`', () => {
    if (!exported) return;
    expect(state.newPromise).toBeDefined();
  });

  it('`resolve()` should be called with a one argument', () => {
    if (!exported) return;
    expect(state.resolve).toBe(1);
  });

  it('`reject()` should be called with a one argument', () => {
    if (!exported) return;
    expect(state.reject).toBe(1);
  });

  it('should resolve if the dice settled without rolling off the table', () => {
    if (!exported) return;
    expect.assertions(2);

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    const promise = rollDice();
    expect(isPromise(promise)).toBe(true);

    const assertionPromise = expect(promise).resolves.toBe(1);

    setTimeoutSpy.mockRestore();
    randomSpy.mockRestore();

    return assertionPromise;
  });

  it('should reject with an Error if the dice rolls off the table', () => {
    if (!exported) return;
    expect.assertions(2);

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.99);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    const promise = rollDice();
    expect(isPromise(promise)).toBe(true);

    const assertionPromise = expect(promise).rejects.toBeInstanceOf(Error);

    setTimeoutSpy.mockRestore();
    randomSpy.mockRestore();

    return assertionPromise;
  });
});
