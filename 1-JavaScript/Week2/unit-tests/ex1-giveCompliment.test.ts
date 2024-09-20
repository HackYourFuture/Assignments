import { simple } from 'acorn-walk';

import {
  beforeAllHelper,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';
import { ExerciseInfo } from '../../../test-runner/unit-test-helpers.js';

describe('js-wk2-ex1-giveCompliment', () => {
  const state: { compliments: string[] } = { compliments: [] };

  let exInfo: ExerciseInfo;

  let giveCompliment: (name: string) => string;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);

    // Get exported function
    giveCompliment = exInfo.module?.giveCompliment;

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        // Look for `const compliments = [...]` and extract its values
        VariableDeclarator({ id, init }) {
          if (
            id.type === 'Identifier' &&
            id.name === 'compliments' &&
            init?.type === 'ArrayExpression'
          ) {
            for (const elem of init.elements) {
              if (
                elem &&
                elem.type === 'Literal' &&
                typeof elem.value === 'string'
              ) {
                state.compliments.push(elem.value);
              }
            }
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(giveCompliment).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  testNoConsoleLog('giveCompliment', () => exInfo.rootNode!);

  test('should take a single parameter', () => {
    expect(giveCompliment).toHaveLength(1);
  });

  test('should include a `compliments` array inside its function body', () => {
    expect(state.compliments).toBeDefined();
  });

  test('the `compliments` array should be initialized with 10 strings', () => {
    expect(state.compliments).toHaveLength(10);
    expect(
      state.compliments.every((compliment) => typeof compliment === 'string')
    ).toBe(true);
  });

  test('should give a random compliment: You are `compliment`, `name`!', () => {
    expect(giveCompliment).toBeDefined();
    expect(state.compliments).toBeDefined();

    const name = 'HackYourFuture';

    const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const received = giveCompliment(name);

    expect(
      spy.mock.calls.length > 0 ? '' : 'compliment is not randomly selected'
    ).toBe('');
    spy.mockRestore();

    const [compliment] = state.compliments;
    expect(received).toBe(`You are ${compliment}, ${name}!`);
  });
});
