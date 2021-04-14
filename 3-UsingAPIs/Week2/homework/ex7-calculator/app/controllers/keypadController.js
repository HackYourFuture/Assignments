function keypadController(dom, model) {
  dom.keypadContainer.addEventListener('click', (event) => {
    const keyCode = event.target.dataset.key;
    model.execute(keyCode);
  });
}

export default keypadController;
