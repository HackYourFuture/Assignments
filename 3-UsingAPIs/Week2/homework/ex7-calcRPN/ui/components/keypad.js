import createAndAppend from '../utils/createAndAppend.js';
import getElementsById from '../utils/getElementsById.js';

function renderKeypad(engine) {
  const { keypadContainer } = getElementsById('keypad-container');

  const opcodes = engine.getOpcodes();
  opcodes.forEach((opcode) => {
    createAndAppend('button', keypadContainer, {
      text: opcode,
    });
  });
  
  keypadContainer.addEventListener('click', (event) => {
    const opcode = event.target.textContent;
    engine.execute(opcode);
  });
}

export default renderKeypad;
