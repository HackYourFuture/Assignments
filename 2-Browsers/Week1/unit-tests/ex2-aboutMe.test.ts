import { DOMWindow } from 'jsdom';
import { prepare, validateHTML } from '../../../test-runner/jsdom-helpers.js';
import {
  beforeAllHelper,
  ExerciseInfo,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  outerHTML?: string;
};

describe('br-wk1-ex2-aboutMe', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;
  let window: DOMWindow;
  let document: DOMWindow['document'];

  beforeAll(async () => {
    window = await prepare();
    document = window.document;

    state.outerHTML = document.documentElement.outerHTML;

    exInfo = await beforeAllHelper(__filename, { noImport: true });
  });

  test('should be syntactically valid', () => validateHTML(state.outerHTML!));

  testTodosRemoved(() => exInfo.source);

  test('each <li> should have the CSS class `list-item`', () => {
    const nodeList = document.querySelectorAll('li');
    const classNames = [...nodeList].map((node) => node.className);
    expect(classNames.every((name) => name === 'list-item')).toBeTruthy();
  });

  test('each <li> should rendered red (= rgb(255, 0, 0))', () => {
    const nodeList = document.querySelectorAll('li');
    const colors = [...nodeList].map(
      (node) => window.getComputedStyle(node).color
    );
    expect(colors.every((color) => color === 'rgb(255, 0, 0)')).toBeTruthy();
  });
});
