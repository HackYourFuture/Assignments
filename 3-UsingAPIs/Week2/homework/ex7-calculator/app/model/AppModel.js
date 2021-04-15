import { execute, getImportedFunctions } from '../processor/processor.js';
import Model from '../lib/Model.js';

function AppModel() {
  const initialState = execute(undefined, 'noop');

  const { getState, setState, subscribe } = Model(initialState);

  return {
    getState,
    setState,
    subscribe,
    getImportedFunctions,
    execute(keyCode) {
      const state = execute(getState(), keyCode);
      setState(state);
      if (state.error) {
        setState(execute(state, 'noop'));
      }
    },
  };
}

export default AppModel;
