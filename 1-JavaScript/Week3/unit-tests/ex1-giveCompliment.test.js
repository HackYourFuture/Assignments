/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const {
  beforeAllHelper,
  checkTodos,
} = require('../../../test-runner/unit-test-helpers');

describe('giveCompliment', () => {
  const state = {};
  let exported, rootNode, source, giveCompliment;

  beforeAll(() => {
    ({ exported, rootNode, source } = beforeAllHelper(__filename, {
      parse: true,
    }));
    giveCompliment = exported;

    rootNode &&
      walk.simple(rootNode, {
        VariableDeclarator({ id, init }) {
          if (id?.name === 'compliments' && init?.type === 'ArrayExpression') {
            state.compliments = init.elements.map((elem) => elem.value);
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should have all TODO comments removed', () => checkTodos(source));

  test('should take a single parameter', () => {
    expect(exported).toBeDefined();
    expect(giveCompliment).toHaveLength(1);
  });

  test('should include a `compliments` array initialized with 10 strings', () => {
    expect(state.compliments ? '' : 'No such array found').toBe('');
    expect(
      state.compliments.length === 10 ? '' : 'Array is not of length 10'
    ).toBe('');
    const isAllStrings = state.compliments.every(
      (compliment) => typeof compliment === 'string'
    );
    expect(isAllStrings ? '' : 'Not all elements are strings').toBe('');
  });

  test('should give a random compliment: You are `compliment`, `name`!', () => {
    expect(exported).toBeDefined();

    expect(state.compliments).toBeDefined();

    const name = 'HackYourFuture';

    const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const received = giveCompliment(name);

    expect(spy.mock.calls.length > 0 ? '' : 'compliment is not random').toBe(
      ''
    );
    spy.mockRestore();

    const [compliment] = state.compliments;
    expect(received).toBe(`You are ${compliment}, ${name}!`);
  });
});
