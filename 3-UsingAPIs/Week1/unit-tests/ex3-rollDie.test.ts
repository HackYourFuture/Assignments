import { simple } from 'acorn-walk';
import {
  beforeAllHelper,
  createTimeoutSpy,
  ExerciseInfo,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  newPromise?: boolean;
  resolve?: number;
  reject?: number;
  [key: string]: any;
};

describe('api-wk1-ex3-rollDie', () => {
  const state: State = {};

  let rollDie: () => Promise<number>;

  let exInfo: ExerciseInfo;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);
    rollDie = exInfo.module?.rollDie;

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        NewExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'Promise') {
            state.newPromise = true;
          }
        },
        CallExpression({ callee, arguments: args }) {
          if (
            callee.type === 'Identifier' &&
            ['resolve', 'reject'].includes(callee.name)
          ) {
            state[callee.name] = args.length;
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(rollDie).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  test('should call `new Promise()`', () => {
    expect(state.newPromise).toBeDefined();
  });

  test('`resolve()` should be called with a one argument', () => {
    expect(state.resolve).toBe(1);
  });

  test('`reject()` should be called with a one argument', () => {
    expect(state.reject).toBe(1);
  });

  test('should resolve when the die settles successfully', () => {
    expect.assertions(3);
    expect(rollDie).toBeDefined();

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const setTimeoutSpy = createTimeoutSpy();

    const promise = rollDie();
    expect(promise).toBeInstanceOf(Promise);
    const assertionPromise = expect(promise).resolves.toBeDefined();

    promise.finally(() => {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    });

    return assertionPromise;
  });

  test('should reject with an Error when the die rolls off the table', async () => {
    expect.assertions(3);
    expect(rollDie).toBeDefined();

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);
    const setTimeoutSpy = createTimeoutSpy();

    try {
      const promise = rollDie();
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
