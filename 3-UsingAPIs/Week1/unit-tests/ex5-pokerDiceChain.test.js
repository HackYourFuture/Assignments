const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('ex5-pokerDiceChain', () => {
  let exported, rollTheDices;

  beforeAll(() => {
    ({ exported } = beforeAllHelper(__filename)),
      { zeroTimeout: true, zeroRandom: true };
    rollTheDices = exported;
  });

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should resolve when all dices settle successfully', () => {
    if (!exported) return;
    expect.assertions(2);

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    const promise = rollTheDices();
    expect(promise).toBeInstanceOf(Promise);
    const assertionPromise = expect(promise).resolves.toBeDefined();

    promise.finally(() => {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    });

    return assertionPromise;
  });

  it('should reject with an Error when a dice rolls off the table', async () => {
    if (!exported) return;
    expect.assertions(2);

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.999);
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((cb) => cb());

    try {
      const promise = rollTheDices();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    } finally {
      setTimeoutSpy.mockRestore();
      randomSpy.mockRestore();
      logSpy.mockRestore();
    }
  });
});
