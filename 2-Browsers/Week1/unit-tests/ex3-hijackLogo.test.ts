import { simple } from 'acorn-walk';

import {
  beforeAllHelper,
  testTodosRemoved,
} from '../../../.dist/unit-test-helpers.js';
import { prepare, validateHTML } from '../../../.dist/jsdom-helpers.js';
import { ExerciseInfo } from '../../../test-runner/unit-test-helpers.js';
import { DOMWindow } from 'jsdom';
import { parse } from 'acorn';

type State = {
  src?: boolean;
  srcset?: boolean;
};

describe('hijackLogo', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename, {
      noImport: true,
      parse: true,
    });

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        MemberExpression({ property }) {
          if (
            property.type === 'Identifier' &&
            ['src', 'srcset'].includes(property.name)
          ) {
            state[property.name] = true;
          }
        },
      });
  });

  testTodosRemoved(() => exInfo.source);

  test('should set the `src` property', () => {
    expect(state.src).toBeDefined();
  });

  test('should set the `srcset` property', () => {
    expect(state.srcset).toBeDefined();
  });
});
