/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  prepare,
  validateHTML,
  deleteFiles,
} = require('../../../test-runner/puppeteer-helpers');
const {
  beforeAllHelper,
  findAncestor,
} = require('../../../test-runner/unit-test-helpers');

describe('programmerFun', () => {
  const state = {};
  let rootNode;

  beforeAll(async () => {
    await prepare(page);
    ({ rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.ancestor(rootNode, {
        NewExpression({ callee }, ancestors) {
          if (
            callee.type === 'Identifier' &&
            callee.name === 'XMLHttpRequest'
          ) {
            state.xmlHttpRequest = { scope: 'global', props: new Set() };
            const variableDeclarator = findAncestor(
              'VariableDeclarator',
              ancestors
            );
            if (variableDeclarator?.id?.type === 'Identifier') {
              state.xmlHttpRequest.varName = variableDeclarator.id.name;
            }
            const functionDeclaration = findAncestor(
              'FunctionDeclaration',
              ancestors
            );
            if (functionDeclaration) {
              state.xmlHttpRequest.scope = 'function';
            }
          }
        },
        MemberExpression({ object, property }, ancestors) {
          if (object.type !== 'Identifier') {
            return;
          }
          if (!(state.xmlHttpRequest && state.xmlHttpRequest.varName)) {
            return;
          }
          if (object.name !== state.xmlHttpRequest.varName) {
            return;
          }
          if (property.type === 'Identifier') {
            state.xmlHttpRequest.props.add(property.name);
            if (property.name === 'addEventListener') {
              const callExpression = findAncestor('CallExpression', ancestors);
              if (callExpression) {
                if (
                  callExpression.arguments.length > 1 &&
                  callExpression.arguments[0].type === 'Literal'
                ) {
                  state.xmlHttpRequest.props.add(
                    callExpression.arguments[0].value
                  );
                }
              }
            }
          }
        },
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
      });
  });

  afterAll(() => {
    deleteFiles();
  });

  it('HTML should be syntactically valid', validateHTML);

  it('should use XMLHttpRequest inside a function', () => {
    expect(state.xmlHttpRequest).toBeDefined();
    expect(state.xmlHttpRequest.scope).toBe('function');
  });

  it("should call XMLHttpRequest's `open` method", () => {
    expect(state.xmlHttpRequest).toBeDefined();
    expect(state.xmlHttpRequest.props.has('open')).toBe(true);
  });

  it("should call XMLHttpRequest's `send` method", () => {
    expect(state.xmlHttpRequest).toBeDefined();
    expect(state.xmlHttpRequest.props.has('send')).toBe(true);
  });

  it("should handle XMLHttpRequest's `load` event", () => {
    expect(state.xmlHttpRequest).toBeDefined();
    expect(
      state.xmlHttpRequest.props.has('load') ||
        state.xmlHttpRequest.props.has('onload')
    ).toBe(true);
  });

  it("should handle XMLHttpRequest's `error` event", () => {
    expect(state.xmlHttpRequest).toBeDefined();
    expect(
      state.xmlHttpRequest.props.has('error') ||
        state.xmlHttpRequest.props.has('onerror')
    ).toBe(true);
  });

  it('should use async/wait', () => {
    expect(state.async).toBeDefined();
    expect(state.await).toBeDefined();
  });

  it('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
