import getDOM from './utils/getDOM.js';
import Model from './model/Model.js';
import Engine from './model/Engine.js';
import DisplayView from './views/DisplayView.js';
import AnnunciatorView from './views/AnnunciatorView.js';
import LoggerView from './views/LoggerView.js';
import KeypadController from './controllers/KeypadController.js';
import ExtensionsController from './controllers/ExtensionsController.js';

function main() {
  const dom = getDOM();
  const model = Model();
  const engine = Engine(model);

  model.subscribe(DisplayView(dom));
  model.subscribe(AnnunciatorView(dom));
  model.subscribe(LoggerView(dom));

  KeypadController(dom, engine);
  ExtensionsController(dom, engine);
}

window.addEventListener('load', main);
