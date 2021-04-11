function createObservable() {
  const observers = [];
  return {
    subscribe(observer) {
      observers.push(observer);
    },
    notify(data) {
      observers.forEach((observer) => observer(data));
    },
  };
}

export default createObservable;
