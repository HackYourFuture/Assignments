/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  testTodosRemoved,
  testNoConsoleLog,
  findAncestor,
} = require('../../../test-runner/unit-test-helpers');

describe('ex3-rollAnAce', () => {
  const state = {};
  let exported, rootNode, rollDieUntil, source;

  beforeAll(async () => {
    ({ rootNode, exported, source } = beforeAllHelper(__filename, {
      parse: true,
    }));

    rollDieUntil = exported;

    rootNode &&
      walk.ancestor(rootNode, {
        TryStatement({ handler }) {
          if (handler.type === 'CatchClause') {
            state.tryCatch = true;
          }
        },
        FunctionDeclaration({ async }) {
          if (async) {
            state.async = true;
          }
        },
        AwaitExpression() {
          state.await = true;
        },
        CallExpression({ callee }, ancestors) {
          if (callee.name === 'rollDieUntil') {
            const functionDeclaration = findAncestor(
              'FunctionDeclaration',
              ancestors
            );
            if (functionDeclaration?.id?.name === 'rollDieUntil') {
              state.recursive = true;
            }
          }
        },
      });
  });

  testTodosRemoved(() => source);

  testNoConsoleLog('rollDieUntil', () => rootNode);

  test('should not include a recursive call', () => {
    expect(state.recursive).toBeUndefined();
  });

  test('should use async/wait', () => {
    expect(state.async).toBeDefined();
    expect(state.await).toBeDefined();
  });

  test('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });

  test('should resolve as soon as a die settles on an ACE', async () => {
    expect.assertions(3);

    expect(exported).toBeDefined();

    // This sequence is known to settle on an ACE in three throws.
    const randomSpy = jest
      .spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.1992491366159479)
      .mockReturnValueOnce(0.9146104190986211)
      .mockReturnValueOnce(0.3023371194859603)
      .mockReturnValueOnce(0.6134982380471312)
      .mockReturnValueOnce(0.44118936387972973)
      .mockReturnValueOnce(0.43394953147951876)
      .mockReturnValueOnce(0.23036088287785983)
      .mockReturnValueOnce(0.14003818771402154)
      .mockReturnValueOnce(0.2066946242859471)
      .mockReturnValueOnce(0.2644310391073186)
      .mockReturnValueOnce(0.8856626254905846)
      .mockReturnValueOnce(0.6403424753337192);

    try {
      const promise = rollDieUntil('ACE');
      expect(promise).toBeInstanceOf(Promise);
      const result = await promise;
      expect(result).toBe('ACE');
    } finally {
      randomSpy.mockRestore();
    }
  });

  test('should reject with an Error when a die rolls off the table', async () => {
    expect.assertions(3);
    expect(exported).toBeDefined();

    // This sequence is known to cause the die to roll off the table
    // in two throws.
    const randomSpy = jest
      .spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.3453916441274625)
      .mockReturnValueOnce(0.9834560635274558)
      .mockReturnValueOnce(0.46197066731784786)
      .mockReturnValueOnce(0.14310034044692732)
      .mockReturnValueOnce(0.13920562773159428)
      .mockReturnValueOnce(0.4756738537780816)
      .mockReturnValueOnce(0.38174035952881447)
      .mockReturnValueOnce(0.7714732722437749);

    try {
      const promise = rollDieUntil('ACE');
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
