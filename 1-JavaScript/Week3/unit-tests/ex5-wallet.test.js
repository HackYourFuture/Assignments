/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('wallet', () => {
  let rootNode;
  const state = { answers: [] };

  beforeAll(() => {
    ({ rootNode } = beforeAllHelper(__filename, {
      parse: true,
      noRequire: true,
    }));

    rootNode &&
      walk.simple(rootNode, {
        Property({ key, value }) {
          if (key.name === 'answer') {
            state.answers.push(value.value);
          }
        },
      });
  });

  test('q1: At line 26, which variables are in the scope marked Closure?', () => {
    expect(state.answers[0] === 'b').toBe(true);
  });

  test('q2: What is in the Call Stack, from top to bottom?', () => {
    expect(state.answers[1] === 'c').toBe(true);
  });

  test('q3: What tooltip appears when hovering over the third debug button?', () => {
    expect(state.answers[2] === 'a').toBe(true);
  });

  test('q4: What is displayed in the console?', () => {
    expect(state.answers[3] === 'a').toBe(true);
  });

  test('q5: The owner of the wallet with insufficient funds is?', () => {
    expect(state.answers[4] === 'c').toBe(true);
  });
});
