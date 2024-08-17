import { simple } from 'acorn-walk';

import { DOMWindow } from 'jsdom';
import { prepare, validateHTML } from '../../../test-runner/jsdom-helpers.js';
import {
  beforeAllHelper,
  ExerciseInfo,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  outerHTML: string;
  titlesAndAuthors: string[];
};

describe('br-wk1-ex1-bookList', () => {
  const state: State = {
    outerHTML: '',
    titlesAndAuthors: [],
  };

  let exInfo: ExerciseInfo;
  let document: DOMWindow['document'];

  beforeAll(async () => {
    ({ document } = await prepare());
    state.outerHTML = document.documentElement.outerHTML;

    exInfo = await beforeAllHelper(__filename, { noImport: true });

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        VariableDeclarator({ id, init }) {
          if (
            id.type === 'Identifier' &&
            id.name === 'myBooks' &&
            init?.type === 'ArrayExpression'
          ) {
            state.titlesAndAuthors = init.elements.reduce((acc, element) => {
              if (element?.type === 'ObjectExpression') {
                element.properties.forEach((prop) => {
                  if (
                    prop.type === 'Property' &&
                    prop.key.type === 'Identifier' &&
                    prop.value.type === 'Literal' &&
                    typeof prop.value.value === 'string' &&
                    ['title', 'author'].includes(prop.key.name)
                  ) {
                    acc.push(prop.value.value);
                  }
                });
              }
              return acc;
            }, [] as string[]);
          }
        },
      });
  });

  test('HTML should be syntactically valid', () =>
    validateHTML(state.outerHTML!));

  testTodosRemoved(() => exInfo.source);

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
          .join(' ')
      : '';
    state.titlesAndAuthors.forEach((string) =>
      expect(result).toEqual(expect.stringContaining(string))
    );
  });

  test('should contain an <img> element for each book', () => {
    const nodeList = document.querySelectorAll('li img');
    const result = nodeList ? nodeList.length : 0;
    expect(result).toBe(3);
  });
});
