import { ancestor } from 'acorn-walk';

import { DOMWindow } from 'jsdom';
import { prepare, validateHTML } from '../../../test-runner/jsdom-helpers.js';
import {
  beforeAllHelper,
  ExerciseInfo,
  OnLoadState,
  onloadValidator,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  outerHTML?: string;
  setInterval?: boolean;
  onload?: boolean;
  callError?: boolean;
};

describe('br-wk1-ex4-whatsTheTime', () => {
  const state: State = {};
  let setIntervalSpy: ReturnType<typeof jest.spyOn>;
  let window: DOMWindow;

  let exInfo: ExerciseInfo;

  beforeAll(async () => {
    window = await prepare();

    setIntervalSpy = jest.spyOn(window, 'setInterval');

    state.outerHTML = window.document.documentElement.outerHTML;
    exInfo = await beforeAllHelper(__filename, { noImport: true });

    exInfo.rootNode &&
      ancestor(exInfo.rootNode, {
        MemberExpression: onloadValidator(state as OnLoadState),
        CallExpression({ callee }) {
          if (
            (callee.type === 'Identifier' && callee.name === 'setInterval') ||
            (callee.type === 'MemberExpression' &&
              callee.object.type === 'Identifier' &&
              callee.object.name === 'window' &&
              callee.property.type === 'Identifier' &&
              callee.property.name === 'setInterval')
          ) {
            state.setInterval = true;
          }
        },
      });
  });

  afterAll(() => {
    window.close();
  });

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML!));

  testTodosRemoved(() => exInfo.source);

  test('should use `setInterval()`', () => {
    expect(state.setInterval).toBeDefined();
  });

  test('should not call `setInterval()` more than once', async () => {
    const callCount = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(setIntervalSpy.mock.calls.length);
      }, 2000);
    });
    expect(callCount).toBeLessThanOrEqual(1);
  });

  test('should use `window.onload` or `window.addEventListener()` for the `load` or `DOMContentLoaded` event', () => {
    expect(state.onload).toBeDefined();
  });

  test('`window.onload` or `window.addEventListener` should not call its event handler function', () => {
    expect(state.callError).not.toBeDefined();
  });
});
