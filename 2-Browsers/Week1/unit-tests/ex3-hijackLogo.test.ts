import { simple } from 'acorn-walk';

import {
  beforeAllHelper,
  ExerciseInfo,
  testTodosRemoved,
} from '../../../test-runner/unit-test-helpers.js';

type State = {
  src?: boolean;
  srcset?: boolean;
  [key: string]: any;
};

describe('br-wk1-ex3-hijackLogo', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename, { noImport: true });

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

  test('should set the `.src` property', () => {
    expect(state.src).toBeDefined();
  });

  test('should set the `.srcset` property', () => {
    expect(state.srcset).toBeDefined();
  });
});
