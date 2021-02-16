'use strict';
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('createPublisher', () => {
  let exported, createPublisher;

  beforeAll(() => {
    ({ exported } = beforeAllHelper(__filename));

    createPublisher = exported;
  });

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should return an object with `subscribe` and a `notify` function properties', () => {
    if (!exported) return;
    const myPublisher = createPublisher();
    expect(typeof myPublisher).toBe('object');
    expect(typeof myPublisher.subscribe).toBe('function');
    expect(typeof myPublisher.notify).toBe('function');
  });

  it('should notify all subscribers of any notification', () => {
    if (!exported) return;
    const myPublisher = createPublisher();
    expect(typeof myPublisher).toBe('object');
    expect(typeof myPublisher.subscribe).toBe('function');
    expect(typeof myPublisher.notify).toBe('function');

    const listener1 = jest.fn();
    const listener2 = jest.fn();

    myPublisher.subscribe(listener1);
    myPublisher.subscribe(listener2);

    myPublisher.notify('Hi!');

    expect(listener1).toHaveBeenCalledWith('Hi!');
    expect(listener2).toHaveBeenCalledWith('Hi!');
  });
});
