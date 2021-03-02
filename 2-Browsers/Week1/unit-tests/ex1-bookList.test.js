const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');

describe('Generated HTML', () => {
  const state = {};
  let document;

  beforeAll(async () => {
    ({ document } = await prepare());
    state.outerHTML = document.documentElement.outerHTML;
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));

  test('should contain a <ul> that is a child of <div id="bookList">', () => {
    const ul = document.querySelector('div[id=bookList] > ul');
    expect(ul).toBeTruthy();
  });

  test('should contain a <ul> with 3 <li> elements', () => {
    const nodeList = document.querySelectorAll('ul > li');
    const result = nodeList ? nodeList.length : 0;
    expect(result).toBe(3);
  });

  test('should contain an <li> with title and author for each book of the `myBooks` array', () => {
    const nodeList = document.querySelectorAll('li');
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

  test('should contain an <img> element for each book', () => {
    const nodeList = document.querySelectorAll('li img');
    const result = nodeList ? nodeList.length : 0;
    expect(result).toBe(3);
  });
});
