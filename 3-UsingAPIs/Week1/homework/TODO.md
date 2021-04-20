# TODO

- Add an exercise where untestable legacy function (impure) must be made testable (pure), e.g:

  ```js
  function foo(...) {
    ...
    console.log(result);
  }
  ```

  to

  ```js
  function foo(...) {
    ...
    return(result);
  }
  ```

- Add an exercise using mock callback functions, e.g.:

  ```js
  function foo(..., cb) {
    ...
    cb(...);
  }
  ```

  ```js
  it('should call the callback', () => {
    const mockCallback = jest.fn();
    foo(..., mockCallback);
    expect(mockCallback).toHaveBeenCalled();
  })
  ```

- Add an exercise using promises.
