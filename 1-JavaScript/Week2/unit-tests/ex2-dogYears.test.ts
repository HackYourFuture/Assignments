import {
  beforeAllHelper,
  ExerciseInfo,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

describe('js-wk2-ex2-dogYears', () => {
  let exInfo: ExerciseInfo;

  let calculateDogAge: (age: number) => string;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);
    calculateDogAge = exInfo.module.calculateDogAge;
  });

  test('should exist and be executable', () => {
    expect(calculateDogAge).toBeDefined();
  });

  testTodosRemoved(() => exInfo.source);

  testNoConsoleLog('calculateDogAge', () => exInfo.rootNode!);

  test('should take a single parameter', () => {
    expect(calculateDogAge).toBeDefined();
    expect(calculateDogAge).toHaveLength(1);
  });

  test('should give 7 dog years for 1 human year', () => {
    expect(calculateDogAge).toBeDefined();
    expect(calculateDogAge(1)).toBe('Your doggie is 7 years old in dog years!');
  });

  test('should give 14 dog years for 2 human years', () => {
    expect(calculateDogAge).toBeDefined();
    expect(calculateDogAge(2)).toBe(
      'Your doggie is 14 years old in dog years!'
    );
  });

  test('give 21 dog years for 3 human years', () => {
    expect(calculateDogAge).toBeDefined();
    expect(calculateDogAge(3)).toBe(
      'Your doggie is 21 years old in dog years!'
    );
  });
});
