import getDOM from './utils/getDOM.js';
import createModel from './model/createModel.js';
import displayView from './views/displayView.js';
import annunciatorView from './views/annunciatorView.js';
import loggerView from './views/loggerView.js';
import keypadController from './controllers/keypadController.js';
import extensionsController from './controllers/extensionsController.js';

function main() {
  const dom = getDOM();
  const model = createModel();

  model.subscribe(displayView(dom));
  model.subscribe(annunciatorView(dom));
  model.subscribe(loggerView(dom));

  keypadController(dom, model);
  extensionsController(dom, model);
}

window.addEventListener('load', main);
