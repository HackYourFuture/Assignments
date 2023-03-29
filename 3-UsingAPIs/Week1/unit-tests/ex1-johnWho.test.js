/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  testTodosRemoved,
  testNoConsoleLog,
} = require('../../../test-runner/unit-test-helpers');

describe('getAnonName', () => {
  const state = { paramCount: 0 };
  let exported, rootNode, source, getAnonName;

  beforeAll(() => {
    ({ exported, rootNode, source } = beforeAllHelper(__filename, {
      parse: true,
    }));
    getAnonName = exported;

    rootNode &&
      walk.simple(rootNode, {
        VariableDeclarator({ id, init }) {
          if (id.type === 'Identifier' && id.name === 'getAnonName') {
            if (init.type === 'ArrowFunctionExpression') {
              state.paramCount = init.params.length;
            }
          }
        },
        FunctionDeclaration({ id, params }) {
          if (id.name === 'getAnonName') {
            state.paramCount = params.length;
          }
        },
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

  testNoConsoleLog('getAnonName', () => rootNode);

  test('should call `new Promise()`', () => {
    expect(state.newPromise).toBeDefined();
  });

  test('should take a single argument', () => {
    expect(state.paramCount).toBe(1);
  });

  test('`resolve()` should be called with a one argument', () => {
    expect(state.resolve).toBe(1);
  });

  test('`reject()` should be called with a one argument', () => {
    expect(state.reject).toBe(1);
  });

  test('should resolve when called with a string argument', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();
    const timeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());
    const promise = getAnonName('John');
    timeoutSpy.mockRestore();
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).resolves.toEqual('John Doe');
  });

  test('should reject with an Error object when called without an argument', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();
    const timeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());
    const promise = getAnonName();
    timeoutSpy.mockRestore();
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).rejects.toBeInstanceOf(Error);
  });
});
