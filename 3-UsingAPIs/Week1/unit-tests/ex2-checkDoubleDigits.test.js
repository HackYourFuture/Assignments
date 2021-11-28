/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  testTodosRemoved,
  testNoConsoleLog,
} = require('../../../test-runner/unit-test-helpers');

describe('checkDoubleDigits', () => {
  const state = {};
  let exported, rootNode, source, checkDoubleDigits;

  beforeAll(() => {
    ({ exported, rootNode, source } = beforeAllHelper(__filename, {
      parse: true,
    }));

    checkDoubleDigits = exported;

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

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  testTodosRemoved(() => source);

  testNoConsoleLog('checkDoubleDigits', () => rootNode);

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
    expect(exported).toBeDefined();
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
    expect(exported).toBeDefined();
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
