import { simple } from 'acorn-walk';
import {
  beforeAllHelper,
  ExerciseInfo,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  newPromise?: boolean;
  resolve?: number;
  reject?: number;
  [key: string]: any;
};

describe('api-wk1-ex2-checkDoubleDigits', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  let checkDoubleDigits: (num: number) => Promise<string>;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);

    checkDoubleDigits = exInfo.module?.checkDoubleDigits;

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
    expect(checkDoubleDigits).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  testNoConsoleLog('checkDoubleDigits', () => exInfo.rootNode!);

  test('should call new Promise()', () => {
    expect(state.newPromise).toBeDefined();
  });

  test('`resolve()` should be called with a one argument', () => {
    expect(state.resolve).toBe(1);
  });

  test('`reject()` should be called with a one argument', () => {
    expect(state.reject).toBe(1);
  });

  test('should be a function that takes a single argument', () => {
    expect(exInfo).toBeDefined();
    expect(
      typeof checkDoubleDigits === 'function' && checkDoubleDigits.length === 1
    ).toBe(true);
  });

  test('(9) should return a rejected promise with an Error object', () => {
    expect.assertions(2);
    const promise = checkDoubleDigits(9);
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).rejects.toBeInstanceOf(Error);
  });

  test('(10) should return a promise that resolves to "This is a double digit number!"', () => {
    expect.assertions(3);
    expect(exInfo).toBeDefined();
    const promise = checkDoubleDigits(10);
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).resolves.toEqual(
      expect.stringContaining('This is a double digit number!')
    );
  });

  test('(99) should return a promise that resolves to "This is a double digit number!"', () => {
    expect.assertions(2);
    const promise = checkDoubleDigits(99);
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).resolves.toEqual(
      expect.stringContaining('This is a double digit number!')
    );
  });

  test('(100) should return a rejected promise with an Error object', () => {
    expect.assertions(2);
    const promise = checkDoubleDigits(100);
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).rejects.toBeInstanceOf(Error);
  });
});
