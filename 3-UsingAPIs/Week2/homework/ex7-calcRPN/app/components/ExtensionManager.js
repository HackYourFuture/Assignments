import createAndAppend from '../utils/createAndAppend.js';

function addCategory(dom, functions, category) {
  createAndAppend('option', dom.extensionSelect, {
    text: category,
    disabled: true,
    class: 'category-header',
  });

  functions
    .filter(({ func }) => func.category === category)
    .forEach(({ name, func }) => {
      createAndAppend('option', dom.extensionSelect, {
        value: name,
        text: func.title,
      });
    });
}

function ExtensionManager(dom, engine) {
  const functions = engine.getImportedFunctions();

  const categories = [
    ...functions.reduce((set, { func }) => {
      if (func.category) {
        set.add(func.category);
      }
      return set;
    }, new Set()),
  ];

  categories.forEach((category) => addCategory(dom, functions, category));

  dom.extensionSelect.addEventListener('change', () => {
    engine.execute(dom.extensionSelect.value);
  });

  dom.extensionBtn.addEventListener('click', () => {
    engine.execute(dom.extensionSelect.value);
  });

  return () => {};
}

export default ExtensionManager;
