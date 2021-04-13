function Keypad(dom, engine) {
  dom.keypadContainer.addEventListener('click', (event) => {
    const keyCode = event.target.dataset.key;
    engine.execute(keyCode);
  });

  return () => undefined;
}

export default Keypad;
