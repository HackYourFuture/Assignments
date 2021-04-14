import { execute, getImportedFunctions } from '../processor/processor.js';

function Engine(model) {
  // Initialize model state
  model.setState(execute(undefined, 'noop'));

  return {
    getImportedFunctions,
    execute(keyCode) {
      const state = execute(model.getState(), keyCode);
      model.setState(state);
      if (state.error) {
        model.setState(execute(state, 'noop'));
      }
    },
  };
}

export default Engine;
