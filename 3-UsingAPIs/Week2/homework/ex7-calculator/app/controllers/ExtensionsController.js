import createAndAppend from '../lib/createAndAppend.js';

function addCategory(dom, functions, category) {
  const optGroup = createAndAppend('optgroup', dom.extensionSelect, {
    label: category,
    class: 'category-header',
  });

  functions
    .filter(({ func }) => func.category === category)
    .forEach(({ name, func }) => {
      createAndAppend('option', optGroup, {
        value: name,
        text: func.title,
      });
    });
}

function ExtensionsController(dom, engine) {
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
}

export default ExtensionsController;
