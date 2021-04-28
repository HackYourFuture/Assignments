const createObservable = require('./ex4-observable');

describe('createObservable', () => {
  test('should exist and be a function', () => {
    expect(typeof createObservable).toBe('function');
  });

  test('should return an object with `subscribe` and a `notify` function properties', () => {
    const observable = createObservable();
    expect(typeof observable).toBe('object');
    expect(typeof observable.subscribe).toBe('function');
    expect(typeof observable.notify).toBe('function');
  });

  test('should notify all subscribers of any notification', () => {
    const observable = createObservable();

    // Create two mocked listener functions
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    // Subscribe both function to the observable
    observable.subscribe(listener1);
    observable.subscribe(listener2);

    // Notify all subscribers with a Hi! message
    observable.notify('Hi!');

    // Assert that both listeners have been called with the Hi! message
    expect(listener1).toHaveBeenCalledWith('Hi!');
    expect(listener2).toHaveBeenCalledWith('Hi!');
  });
});
