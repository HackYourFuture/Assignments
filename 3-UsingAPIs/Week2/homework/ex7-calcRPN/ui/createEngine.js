import createObservable from './utils/createObservable.js ';

function createEngine() {
  let stack = [0, 0, 0, 0];
  const observable = createObservable();

  return {
    execute(opcode) {
      try {
        observable.notify({ type: 'pre-execute', payload: [...stack] });
        stack = window.executeOperation(stack, opcode);
        observable.notify({ type: 'post-execute', payload: [...stack] });
      } catch (error) {
        observable.notify({ type: 'error', payload: error });
      }
    },
    getOpcodes() {
      return window.getOpcodes();
    },
    subscribe(listener) {
      observable.subscribe(listener);
    },
  };
}

export default createEngine;
