function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([keyCode, value]) => {
    if (keyCode === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(keyCode, value);
    }
  });
  return elem;
}

export default createAndAppend;
