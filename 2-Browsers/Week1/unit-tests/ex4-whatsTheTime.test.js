/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const {
  beforeAllHelper,
  onloadValidator,
} = require('../../../test-runner/unit-test-helpers');

describe('whatsTheTime', () => {
  let rootNode;
  const state = {};

  beforeAll(async () => {
    const { document } = await prepare();
    state.outerHTML = document.documentElement.outerHTML;
    ({ rootNode } = beforeAllHelper(__filename, {
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

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML));

  test('should use `setInterval()`', () => {
    expect(state.setInterval).toBeDefined();
  });

  test('should use `window.onload` or `window.addEventListener()` for the `load` or `DOMContentLoaded` event', () => {
    expect(state.onload).toBeDefined();
  });

  test('`window.onload` or `window.addEventListener` should not call its event handler function', () => {
    expect(state.callError).not.toBeDefined();
  });
});
