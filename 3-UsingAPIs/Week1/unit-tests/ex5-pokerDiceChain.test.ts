import {
  beforeAllHelper,
  ExerciseInfo,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

describe('api-wk1-ex5-pokerDiceChain', () => {
  let exInfo: ExerciseInfo;

  let rollDice: () => Promise<number[]>;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);
    rollDice = exInfo.module?.rollDice;
  });

  test('should exist and be executable', () => {
    expect(rollDice).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  testNoConsoleLog('rollDice', () => exInfo.rootNode!);

  test('should resolve when all dice settle successfully', async () => {
    expect.assertions(4);
    expect(rollDice).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const promise = rollDice();
    expect(promise).toBeInstanceOf(Promise);
    const result = await promise;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(5);

    promise.finally(() => {
      randomSpy.mockRestore();
    });
  });

  test('should reject with an Error when a die rolls off the table', async () => {
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
