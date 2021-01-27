/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  prepare,
  validateHTML,
  deleteFiles,
} = require('../../../test-runner/puppeteer-helpers');
const {
  beforeAllHelper,
  findAncestor,
} = require('../../../test-runner/unit-test-helpers');

describe('dogPhotos', () => {
  const state = {};
  let rootNode;

  beforeAll(async () => {
    await prepare(page);
    ({ rootNode } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.ancestor(rootNode, {
        MemberExpression({ object, property }, ancestors) {
          if (object.type !== 'Identifier') {
            return;
          }
          if (object.name === 'axios') {
            if (property.type === 'Identifier') {
              state.axios = { method: property.name, scope: 'global' };
              const functionDeclaration = findAncestor(
                'FunctionDeclaration',
                ancestors
              );
              if (functionDeclaration) {
                state.axios.scope = 'function';
              }
            }
          }
        },
      });
  });

  afterAll(() => {
    deleteFiles();
  });

  it('HTML should be syntactically valid', validateHTML);

  it('should use `axios` inside a function', () => {
    expect(state.axios).toBeDefined();
    expect(state.axios.scope).toBe('function');
  });
});
