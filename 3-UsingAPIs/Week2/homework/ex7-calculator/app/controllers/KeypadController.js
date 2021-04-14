function KeypadController(dom, engine) {
  dom.keypadContainer.addEventListener('click', (event) => {
    const keyCode = event.target.dataset.key;
    engine.execute(keyCode);
  });
}

export default KeypadController;
