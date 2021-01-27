/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  prepare,
  validateHTML,
  deleteFiles,
} = require('../../../test-runner/puppeteer-helpers');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('pokemonApp', () => {
  const state = {};
  let rootNode;

  beforeAll(async () => {
    await prepare(page);
    ({ rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        AwaitExpression({ argument }) {
          if (argument.type !== 'CallExpression') {
            return;
          }
          const { callee } = argument;
          if (callee?.name === 'fetch') {
            state.awaitFetch = true;
          }
        },
      });
  });

  afterAll(() => {
    deleteFiles();
  });

  it('HTML should be syntactically valid', validateHTML);

  it('should use `await fetch()`', () => {
    expect(state.awaitFetch).toBeDefined();
  });
});
