import { execute, getImportedFunctions } from './processor/processor.js';
import createObservable from '../utils/createObservable.js ';

function createModel() {
  const observable = createObservable();

  // Initialize state
  let state = execute(undefined, 'noop');

  return {
    getImportedFunctions,
    execute(keyCode) {
      state = execute(state, keyCode);
      observable.notify(state);
      if (state.error) {
        state = execute(state, 'noop');
        observable.notify(state);
      }
    },
    subscribe(listener) {
      observable.subscribe(listener);
    },
  };
}

export default createModel;
