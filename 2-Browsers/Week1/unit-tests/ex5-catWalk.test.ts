/* eslint-disable hyf/camelcase */
import { ancestor } from 'acorn-walk';

import { DOMWindow } from 'jsdom';
import { prepare, validateHTML } from '../../../.dist/jsdom-helpers.js';
import {
  beforeAllHelper,
  onloadValidator,
  testTodosRemoved,
} from '../../../.dist/unit-test-helpers.js';
import { ExerciseInfo } from '../../../test-runner/unit-test-helpers.js';

type State = {
  outerHTML?: string;
  timer?: boolean;
  onload?: boolean;
  callError?: boolean;
};

describe('catWalk', () => {
  let window: DOMWindow;

  let exInfo: ExerciseInfo;
  const state: State = {};

  beforeAll(async () => {
    window = await prepare();
    const { document } = window;
    state.outerHTML = document.documentElement.outerHTML;
    exInfo = await beforeAllHelper(__filename, { noImport: true });

    exInfo.rootNode &&
      ancestor(exInfo.rootNode, {
        MemberExpression: onloadValidator(state),
        CallExpression({ callee }) {
          if (
            (callee.type === 'Identifier' &&
              ['setInterval', 'setTimeout'].includes(callee.name)) ||
            (callee.type === 'MemberExpression' &&
              callee.object.type === 'Identifier' &&
              callee.object.name === 'window' &&
              callee.property.type === 'Identifier' &&
              ['setInterval', 'setTimeout'].includes(callee.property.name))
          ) {
            state.timer = true;
          }
        },
      });
  });

  afterAll(() => {
    window.close();
  });

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML));

  testTodosRemoved(() => exInfo.source);

  test('should use `setInterval()` and/or `setTimeout()`', () => {
    expect(state.timer).toBeDefined();
  });

  test('should use `window.onload` or `window.addEventListener()` for the `load` or `DOMContentLoaded` event', () => {
    expect(state.onload).toBeDefined();
  });

  test('`window.onload` or `window.addEventListener` should not call its event handler function', () => {
    expect(state.callError).not.toBeDefined();
  });
});
