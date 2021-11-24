/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const {
  beforeAllHelper,
  onloadValidator,
  testTodosRemoved,
} = require('../../../test-runner/unit-test-helpers');

describe('catWalk', () => {
  let window, rootNode, source;
  const state = {};

  beforeAll(async () => {
    window = await prepare();
    const { document } = window;
    state.outerHTML = document.documentElement.outerHTML;
    ({ rootNode, source } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.ancestor(rootNode, {
        MemberExpression: onloadValidator(state),
        CallExpression({ callee }) {
          if (
            ['setInterval', 'setTimeout'].includes(callee.name) ||
            (callee.object?.name === 'window' &&
              ['setInterval', 'setTimeout'].includes(callee.property?.name))
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

  testTodosRemoved(() => source);

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
