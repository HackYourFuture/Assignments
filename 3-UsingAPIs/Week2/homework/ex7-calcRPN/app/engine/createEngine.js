import { execute, getImportedFunctions } from './engine.js';
import createObservable from '../utils/createObservable.js ';
import './importExtensions.js';

function createEngine() {
  const observable = createObservable();

  // Initialize state
  let state = execute(undefined, 'noop');

  return {
    getImportedFunctions,
    execute(keyCode) {
      state = execute(state, keyCode);
      observable.notify(state);
    },
    subscribe(listener) {
      observable.subscribe(listener);
    },
  };
}

export default createEngine;
