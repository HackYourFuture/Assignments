/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const _ = require('lodash');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('filterPrivateData', () => {
  const state = {};
  let exported, rootNode, filterPrivateData, employeeRecords;

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));
    ({ filterPrivateData, employeeRecords } = exported);

    rootNode &&
      walk.simple(rootNode, {
        ObjectExpression({ properties }) {
          if (properties.every((prop) => prop.shorthand)) {
            state.objectDestructuring = true;
          }
        },
        ObjectPattern({ properties }) {
          if (properties.every((prop) => prop.shorthand)) {
            state.objectLiteralShorthand = true;
          }
        },
      });
  });

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should be a function that takes a single parameter', () => {
    expect(exported).toBeDefined();
    expect(typeof filterPrivateData === 'function').toBe(true);
    expect(filterPrivateData).toHaveLength(1);
  });

  it('should use object destructuring', () => {
    expect(exported).toBeDefined();
    expect(state.objectDestructuring).toBeDefined();
  });

  it('should use object literal shorthand', () => {
    expect(exported).toBeDefined();
    expect(state.objectLiteralShorthand).toBeDefined();
  });

  it("should not modify ('mutate') its arguments", () => {
    expect(typeof filterPrivateData === 'function').toBe(true);
    const original = _.cloneDeep(employeeRecords);
    const newData = filterPrivateData(employeeRecords);
    expect(newData).not.toBe(employeeRecords);
    expect(employeeRecords).toEqual(original);
  });

  it('should return a new array with the private parts filtered', () => {
    expect(typeof filterPrivateData === 'function').toBe(true);
    const expected = [
      {
        name: 'John',
        occupation: 'developer',
        email: 'john.doe@somewhere.net',
      },
      {
        name: 'Jane',
        occupation: 'manager',
        email: 'jane.eyre@somewhere.net',
      },
    ];
    const actual = filterPrivateData(employeeRecords);
    expect(actual).toEqual(expected);
  });
});
