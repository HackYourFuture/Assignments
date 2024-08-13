import { simple } from 'acorn-walk';

import {
  beforeAllHelper,
  testTodosRemoved,
} from '../../../.dist/unit-test-helpers.js';
import { prepare, validateHTML } from '../../../.dist/jsdom-helpers.js';
import { ExerciseInfo } from '../../../test-runner/unit-test-helpers.js';
import { DOMWindow } from 'jsdom';

type State = {
  outerHTML: string;
  titlesAndAuthors: string[];
};

describe('Generated HTML', () => {
  const state: State = {
    outerHTML: '',
    titlesAndAuthors: [],
  };

  let exInfo: ExerciseInfo;
  let document: DOMWindow['document'];

  beforeAll(async () => {
    ({ document } = await prepare());
    state.outerHTML = document.documentElement.outerHTML;

    exInfo = await beforeAllHelper(__filename, {
      noImport: true,
      parse: true,
    });

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
