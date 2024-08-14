import { simple } from 'acorn-walk';
import { prepare, validateHTML } from '../../../.dist/jsdom-helpers.js';
import {
  beforeAllHelper,
  testTodosRemoved,
} from '../../../.dist/unit-test-helpers';
import { ExerciseInfo } from '../../../test-runner/unit-test-helpers.js';

type State = {
  outerHTML?: string;
  fetch?: boolean;
  tryCatch?: boolean;
  async?: boolean;
  await?: boolean;
};

describe('programmerFun', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  beforeAll(async () => {
    const { document } = await prepare();
    state.outerHTML = document.documentElement.outerHTML;

    exInfo = await beforeAllHelper(__filename, { noImport: true });

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        CallExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'fetch') {
            state.fetch = true;
          }
        },
        TryStatement({ handler }) {
          if (handler?.type === 'CatchClause') {
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

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML));

  testTodosRemoved(() => exInfo.source);

  test('should use `fetch()`', () => {
    expect(state.fetch).toBeDefined();
  });

  test('should use async/wait', () => {
    expect(state.async).toBeDefined();
    expect(state.await).toBeDefined();
  });

  test('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
