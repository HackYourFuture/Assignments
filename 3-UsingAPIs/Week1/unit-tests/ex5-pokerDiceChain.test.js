const {
  beforeAllHelper,
  checkTodos,
} = require('../../../test-runner/unit-test-helpers');

describe('ex5-pokerDiceChain', () => {
  let exported, source, rollTheDice;

  beforeAll(() => {
    ({ exported, source } = beforeAllHelper(__filename));
    rollTheDice = exported;
  });

  test('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  test('should have all TODO comments removed', () => checkTodos(source));

  test('should resolve when all dice settle successfully', async () => {
    expect.assertions(4);
    expect(exported).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const promise = rollTheDice();
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
    expect(exported).toBeDefined();

    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);

    try {
      const promise = rollTheDice();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
