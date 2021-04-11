import renderDisplay from './components/display.js';
import renderKeypad from './components/keypad.js';
import createEngine from './createEngine.js';
import renderEntry from './components/entry.js';

function main() {
  const engine = createEngine();
  renderEntry(engine);
  renderKeypad(engine);
  renderDisplay(engine);
}

window.addEventListener('load', main);
