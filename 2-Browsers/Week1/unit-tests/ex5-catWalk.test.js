/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');
const {
  beforeAllHelper,
  onloadValidator,
} = require('../../../test-runner/unit-test-helpers');

describe('catWalk', () => {
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
            ['setInterval', 'setTimeout'].includes(callee.name) ||
            (callee.object?.name === 'window' &&
              ['setInterval', 'setTimeout'].includes(callee.property?.name))
          ) {
            state.timer = true;
          }
        },
      });
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  it('should use `setInterval()` and/or `setTimeout()`', () => {
    expect(state.timer).toBeDefined();
  });

  it('should use `window.onload` or `window.addEventListener()` for the `load` or `DOMContentLoaded` event', () => {
    expect(state.onload).toBeDefined();
  });

  it('`window.onload` or `window.addEventListener` should not call its event handler function', () => {
    expect(state.callError).not.toBeDefined();
  });
});
