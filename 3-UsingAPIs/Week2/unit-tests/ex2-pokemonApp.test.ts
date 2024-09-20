import { simple } from 'acorn-walk';

import { prepare, validateHTML } from '../../../test-runner/jsdom-helpers.js';
import {
  beforeAllHelper,
  ExerciseInfo,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  outerHTML?: string;
  fetch?: boolean;
  tryCatch?: boolean;
  awaitFetch?: boolean;
};

describe('api-wk2-ex2-pokemonApp', () => {
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
        AwaitExpression() {
          state.awaitFetch = true;
        },
      });
  });

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML!));

  testTodosRemoved(() => exInfo.source);

  test('should use `fetch()`', () => {
    expect(state.fetch).toBeDefined();
  });

  test('should use `await fetch()`', () => {
    expect(state.awaitFetch).toBeDefined();
  });

  test('should use try/catch', () => {
    expect(state.tryCatch).toBeDefined();
  });
});
