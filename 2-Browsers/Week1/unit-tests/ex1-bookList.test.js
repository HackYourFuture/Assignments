const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');

describe('Generated HTML', () => {
  const state = {};
  let document;

  beforeAll(async () => {
    ({ document } = await prepare());
    state.outerHTML = document.documentElement.outerHTML;
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  test('should contain a <ul> with 3 <li> elements', () => {
    const nodeList = document.querySelectorAll('div[id=bookList] > ul > li');
    const result = nodeList ? nodeList.length : 0;
    expect(result).toBe(3);
  });

  test('should include an <li> with title and author for each book', () => {
    const nodeList = document.querySelectorAll('div[id=bookList] > ul > li');
    const result = nodeList
      ? Array.from(nodeList)
          .map((node) => node.textContent)
          .join(', ')
      : '';
    expect(result).toMatch(/The Design of Everyday Things/);
    expect(result).toMatch(/Don Norman/);
    expect(result).toMatch(/The Most Human Human/);
    expect(result).toMatch(/Brian Christian/);
    expect(result).toMatch(/The Pragmatic Programmer/);
    expect(result).toMatch(/Andrew Hunt/);
  });

  test('should include an <img> element for each book', () => {
    const nodeList = document.querySelectorAll(
      'div[id=bookList] > ul > li img'
    );
    const result = nodeList ? nodeList.length : 0;
    expect(result).toBe(3);
  });
});
