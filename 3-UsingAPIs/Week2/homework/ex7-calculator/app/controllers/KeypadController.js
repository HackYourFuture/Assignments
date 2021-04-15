function KeypadController(dom, model) {
  dom.keypadContainer.addEventListener('click', (event) => {
    const keyCode = event.target.dataset.key;
    model.execute(keyCode);
  });
}

export default KeypadController;
