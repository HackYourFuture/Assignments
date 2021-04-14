const camelize = (name) => name.replace(/-./g, (x) => x.toUpperCase()[1]);

function getDOM() {
  const dom = {};
  document.querySelectorAll('*[id]').forEach((elem) => {
    dom[camelize(elem.id)] = elem;
  });
  return dom;
}

export default getDOM;
