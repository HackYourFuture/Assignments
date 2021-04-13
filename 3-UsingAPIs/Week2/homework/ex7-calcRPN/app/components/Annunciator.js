function Annunciator(dom, engine) {
  return ({ error }) => {
    if (error) {
      dom.annunciator.textContent = error.message;
      setTimeout(() => {
        dom.annunciator.textContent = '';
        engine.execute('noop');
      }, 2000);
    }
  };
}

export default Annunciator;
