import { simple } from 'acorn-walk';
import {
  beforeAllHelper,
  createTimeoutSpy,
  ExerciseInfo,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  paramCount: number;
  newPromise?: boolean;
  resolve?: number;
  reject?: number;
  [key: string]: any;
};

describe('api-wk1-ex1-johnWho', () => {
  const state: State = { paramCount: 0 };

  let getAnonName: (name: string) => Promise<string>;

  let exInfo: ExerciseInfo;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);

    getAnonName = exInfo.module?.getAnonName;

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        VariableDeclarator({ id, init }) {
          if (id.type === 'Identifier' && id.name === 'getAnonName') {
            if (init?.type === 'ArrowFunctionExpression') {
              state.paramCount = init.params.length;
            }
          }
        },
        FunctionDeclaration({ id, params }) {
          if (id?.type === 'Identifier' && id?.name === 'getAnonName') {
            state.paramCount = params.length;
          }
        },
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
    expect(getAnonName).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  testNoConsoleLog('getAnonName', () => exInfo.rootNode!);

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
    expect(getAnonName).toBeDefined();
    const timeoutSpy = createTimeoutSpy();
    const promise = getAnonName('John');
    timeoutSpy.mockRestore();
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).resolves.toEqual('John Doe');
  });

  test('should reject with an Error object when called without an argument', async () => {
    expect.assertions(3);
    expect(getAnonName).toBeDefined();
    const timeoutSpy = createTimeoutSpy();
    // @ts-ignore
    const promise = getAnonName();
    timeoutSpy.mockRestore();
    expect(promise).toBeInstanceOf(Promise);
    return expect(promise).rejects.toBeInstanceOf(Error);
  });
});
