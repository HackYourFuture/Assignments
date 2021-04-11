import getElementsById from '../utils/getElementsById.js';

function renderDisplay(engine) {
  const dom = getElementsById(
    'error-container',
    'x-register',
    'y-register',
    'z-register',
    't-register'
  );

  engine.subscribe(({ type, payload }) => {
    switch (type) {
      case 'post-execute': {
        dom.errorContainer.textContent = '';
        const [x, y, z, t] = payload;
        dom.tRegister.textContent = t;
        dom.zRegister.textContent = z;
        dom.yRegister.textContent = y;
        dom.xRegister.textContent = x;
        return;
      }
      case 'error': {
        dom.errorContainer.textContent = payload.message;
        return;
      }
      default: {
        dom.errorContainer.textContent = `Unknown action type: ${type}`;
        return;
      }
    }
  });
}

export default renderDisplay;
