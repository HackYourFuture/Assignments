/* eslint-disable hyf/camelcase */
'use strict';
const walk = require('acorn-walk');
const { beforeAllHelper } = require('../../../test-runner/unit-test-helpers');

describe('tellFortune', () => {
  let exported, rootNode, tellFortune;
  const state = {};

  beforeAll(() => {
    ({ exported, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    }));

    tellFortune = exported;

    rootNode &&
      walk.simple(rootNode, {
        VariableDeclarator({ id, init }) {
          if (id && init?.type === 'ArrayExpression') {
            state[id.name] = init.elements
              .filter((elem) => elem.type === 'Literal')
              .map((elem) => elem.value);
          }
        },
        FunctionDeclaration(node) {
          if (node.id.name === 'tellFortune') {
            state.tellFortuneParams = node.params.map((param) => param.name);
          }
        },
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'selectRandomly' &&
            node.arguments.length > 0
          ) {
            if (!state.selectRandomlyArgs) {
              state.selectRandomlyArgs = [];
            }
            state.selectRandomlyArgs.push(node.arguments[0].name);
          }
        },
      });
  });

  it('should exist and be executable', () => {
    expect(exported).toBeDefined();
  });

  it('should take four parameters', () => {
    if (!exported) return;
    expect(tellFortune).toHaveLength(4);
  });

  it('should call function `selectRandomly` for each of its arguments', () => {
    if (!exported) return;
    expect(state.selectRandomlyArgs).toBeDefined();
    expect(state.selectRandomlyArgs).toEqual(
      expect.arrayContaining(state.tellFortuneParams)
    );
  });

  it('should tell the fortune by randomly selecting array values', () => {
    if (!exported) return;
    const { numKids, partnerNames, locations, jobTitles } = state;

    const arraysOkay =
      Array.isArray(numKids) &&
      numKids.length === 5 &&
      Array.isArray(locations) &&
      locations.length === 5 &&
      Array.isArray(partnerNames) &&
      partnerNames.length === 5 &&
      Array.isArray(jobTitles) &&
      jobTitles.length === 5;

    expect(
      arraysOkay
        ? ''
        : 'numKids, locations, partnerNames and jobTitles arrays must exist with five elements each'
    ).toBe('');

    const spy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const received = tellFortune(numKids, partnerNames, locations, jobTitles);

    expect(
      spy.mock.calls.length === 4
        ? ''
        : 'fortune-telling is not randomly composed'
    ).toBe('');
    spy.mockRestore();

    expect(received).toBe(
      `You will be a ${jobTitles[0]} in ${locations[0]}, married to ${partnerNames[0]} with ${numKids[0]} kids.`
    );
  });
});
