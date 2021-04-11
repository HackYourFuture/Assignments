import getElementsById from '../utils/getElementsById.js';

function enterValue(dom, engine) {
  const value = dom.input.value.trim();
  if (value !== '') {
    dom.input.value = '';
    engine.execute(parseFloat(value));
  }
}

function renderEntry(engine) {
  const dom = getElementsById('input', 'enter');
  dom.enter.addEventListener('click', () => {
    enterValue(dom, engine);
  });

  engine.subscribe(({ type }) => {
    switch (type) {
      case 'pre-execute':
        enterValue(dom, engine);
        break;
      case 'post-execute':
        dom.input.focus();
        break;
    }
  });
}

export default renderEntry;
