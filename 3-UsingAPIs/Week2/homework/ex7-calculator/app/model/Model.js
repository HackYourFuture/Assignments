import Observable from '../utils/Observable.js ';

function Model() {
  const observable = Observable();

  let state;

  return {
    subscribe(listener) {
      observable.subscribe(listener);
    },
    getState() {
      return state;
    },
    setState(newState) {
      state = newState;
      observable.notify(state);
    },
  };
}

export default Model;
