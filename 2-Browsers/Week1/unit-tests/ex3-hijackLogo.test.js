/* eslint-disable hyf/camelcase */
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  checkTodos,
} = require('../../../test-runner/unit-test-helpers');

describe('hijackLogo', () => {
  let rootNode, source;
  const state = {};

  beforeAll(() => {
    ({ rootNode, source } = beforeAllHelper(__filename, {
      noRequire: true,
      parse: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        MemberExpression({ property }) {
          if (['src', 'srcset'].includes(property.name)) {
            state[property.name] = true;
          }
        },
      });
  });

  test('should have all TODO comments removed', () => checkTodos(source));

  test('should set the `src` property', () => {
    expect(state.src).toBeDefined();
  });

  test('should set the `srcset` property', () => {
    expect(state.srcset).toBeDefined();
  });
});
