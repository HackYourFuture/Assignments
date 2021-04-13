import createEngine from './engine/createEngine.js';
import getDOM from './utils/getDOM.js';
import Display from './components/Display.js';
import Keypad from './components/Keypad.js';
import Annunciator from './components/Annunciator.js';
import Logger from './components/Logger.js';
import ExtensionManager from './components/ExtensionManager.js';

function main() {
  const dom = getDOM();
  const engine = createEngine();

  engine.subscribe(Display(dom));
  engine.subscribe(Keypad(dom, engine));
  engine.subscribe(ExtensionManager(dom, engine));
  engine.subscribe(Annunciator(dom, engine));
  engine.subscribe(Logger(dom));
}

window.addEventListener('load', main);
