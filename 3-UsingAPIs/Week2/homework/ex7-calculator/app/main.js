import getDOM from './lib/getDOM.js';
import AppModel from './model/AppModel.js';
import DisplayView from './views/DisplayView.js';
import AnnunciatorView from './views/AnnunciatorView.js';
import LoggerView from './views/LoggerView.js';
import KeypadController from './controllers/KeypadController.js';
import ExtensionsController from './controllers/ExtensionsController.js';

function main() {
  const dom = getDOM();
  const model = AppModel();

  model.subscribe(DisplayView(dom));
  model.subscribe(AnnunciatorView(dom));
  model.subscribe(LoggerView(dom));

  KeypadController(dom, model);
  ExtensionsController(dom, model);
}

window.addEventListener('load', main);
