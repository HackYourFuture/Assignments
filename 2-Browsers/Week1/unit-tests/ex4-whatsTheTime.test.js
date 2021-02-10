/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  prepare,
  validateHTML,
  deleteFiles,
} = require('../../../test-runner/jsdom-helpers');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

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
      walk.simple(rootNode, {
        MemberExpression({ object, property }) {
          if (
            object.type === 'Identifier' &&
            object.name === 'window' &&
            property.type === 'Identifier'
          ) {
            if (['onload', 'addEventListener'].includes(property.name)) {
              state.onload = true;
            }
          }
        },
        CallExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'setInterval') {
            state.setInterval = true;
          }
        },
      });
  });

  afterAll(() => {
    deleteFiles();
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  it('should use `setInterval()`', () => {
    expect(state.setInterval).toBeDefined();
  });

  it('should use `window.onload` or `window.addEventListener`', () => {
    expect(state.onload).toBeDefined();
  });
});
