import { simple } from 'acorn-walk';
import { beforeAllHelper } from '../../../test-runner/unit-test-helpers.js';

describe('js-wk3-ex5-wallet', () => {
  const state = { answers: [] as string[] };
  let exInfo;
  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename, { noImport: true });
    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        Property({ key, value }) {
          if (
            key.type === 'Identifier' &&
            key.name === 'answer' &&
            value.type === 'Literal' &&
            typeof value.value === 'string'
          ) {
            state.answers.push(value.value);
          }
        },
      });
  });

  test('q1: At line 24, which variables are in the scope marked Closure?', () => {
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
