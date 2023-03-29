/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const {
  beforeAllHelper,
  onloadValidator,
  testTodosRemoved,
} = require('../../../test-runner/unit-test-helpers');

describe('whatsTheTime', () => {
  let rootNode, source;
  const state = {};
  let setIntervalSpy;
  let window;

  beforeAll(async () => {
    window = await prepare();

    setIntervalSpy = jest.spyOn(window, 'setInterval');

    state.outerHTML = window.document.documentElement.outerHTML;
    ({ rootNode, source } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.ancestor(rootNode, {
        MemberExpression: onloadValidator(state),
        CallExpression({ callee }) {
          if (
            callee.name === 'setInterval' ||
            (callee.object?.name === 'window' &&
              callee.property?.name === 'setInterval')
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
    validateHTML(state.outerHTML));

  testTodosRemoved(() => source);

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
