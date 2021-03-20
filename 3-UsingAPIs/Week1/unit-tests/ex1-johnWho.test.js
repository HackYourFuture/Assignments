/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

const isPromise = (obj) => typeof obj === 'object' && 'then' in obj;

describe('getAnonName', () => {
  const state = { paramCount: 0 };
  let exported, rootNode, getAnonName;

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
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
        FunctionDeclaration({ params }) {
          state.paramCount = params.length;
        },
        NewExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'Promise') {
            state.newPromise = true;
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

  it('should take a single argument', () => {
    if (!exported) return;
    expect(state.paramCount).toBe(1);
  });

  it('should return a resolved promise when called with a string argument', () => {
    if (!exported) return;
    expect.assertions(2);
    const promise = getAnonName('John');
    expect(isPromise(promise)).toBe(true);
    return expect(promise).resolves.toEqual('John Doe');
  });

  it('should return a rejected promise when called without an argument', () => {
    if (!exported) return;
    expect.assertions(2);
    const promise = getAnonName();
    expect(isPromise(promise)).toBe(true);
    return expect(promise).rejects.toBeInstanceOf(Error);
  });
});
