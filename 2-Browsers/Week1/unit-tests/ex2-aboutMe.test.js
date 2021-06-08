const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');

describe('Generated HTML', () => {
  const state = {};
  let window, document;

  beforeAll(async () => {
    window = await prepare();
    document = window.document;
    state.outerHTML = document.documentElement.outerHTML;
  });

  test('should be syntactically valid', () => validateHTML(state.outerHTML));

  test('- the body font-family should be `Arial, sans-serif`', () => {
    const fontFamily = document.body.style.fontFamily;
    expect(fontFamily).toEqual(expect.stringContaining('Arial'));
    expect(fontFamily).toEqual(expect.stringContaining('sans-serif'));
  });

  test('- each <li> should have the CSS class `list-item`', () => {
    const nodeList = document.querySelectorAll('li');
    const classNames = [...nodeList].map((node) => node.className);
    expect(classNames.every((name) => name === 'list-item')).toBeTruthy();
  });

  test('- each <li> should rendered red', () => {
    const nodeList = document.querySelectorAll('li');
    const colors = [...nodeList].map(
      (node) => window.getComputedStyle(node).color
    );
    expect(colors.every((color) => color === 'red')).toBeTruthy();
  });
});
