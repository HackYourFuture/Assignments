import Observable from '../lib/Observable.js ';

function Model() {
  const { subscribe, notify } = Observable();

  let state;

  return {
    subscribe,
    getState() {
      return state;
    },
    setState(newState) {
      state = newState;
      notify(state);
    },
  };
}

export default Model;
