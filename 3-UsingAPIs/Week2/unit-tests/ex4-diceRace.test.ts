import { simple } from 'acorn-walk';
import {
  beforeAllHelper,
  ExerciseInfo,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  promiseAll?: boolean;
  diceMap?: boolean;
};

describe('api-wk2-ex4-diceRace', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  let rollDice: () => Promise<string>;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);

    rollDice = exInfo.module?.rollDice;

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        MemberExpression({ object, property }) {
          if (object.type === 'Identifier' && property.type === 'Identifier') {
            if (object.name === 'Promise' && property.name === 'race') {
              state.promiseAll = true;
            } else if (object.name === 'dice' && property.name === 'map') {
              state.diceMap = true;
            }
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(rollDice).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  testNoConsoleLog('rollDice', () => exInfo.rootNode!);

  test('should use `dice.map()`', () => {
    expect(state.diceMap).toBeDefined();
  });

  test('should use `Promise.race()`', () => {
    expect(state.promiseAll).toBeDefined();
  });

  test('should resolve as soon as a die settles successfully', async () => {
    expect.assertions(3);
    expect(rollDice).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const promise = rollDice();
    expect(promise).toBeInstanceOf(Promise);
    const result = await promise;
    expect(typeof result).toBe('string');

    promise.finally(() => {
      randomSpy.mockRestore();
    });
  });

  test('should reject with an Error as soon as a die rolls off the table', async () => {
    expect.assertions(3);
    expect(rollDice).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);

    try {
      const promise = rollDice();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
