/* eslint-disable hyf/camelcase */
'use strict';
import type { Node } from 'acorn';
import { simple } from 'acorn-walk';
import {
  beforeAllHelper,
  testNoConsoleLog,
  testTodosRemoved,
} from '../../../.dist/unit-test-helpers';

describe('tellFortune', () => {
  let module: any;
  let rootNode: Node | undefined;
  let source: string;

  let tellFortune: (...args: any) => any;

  type State = {
    selectRandomlyParams: string[];
    tellFortuneParams: string[];
    numKids?: string[];
    partnerNames?: string[];
    locations?: string[];
    jobTitles?: string[];
  };

  const state: State = {
    selectRandomlyParams: [],
    tellFortuneParams: [],
  };

  beforeAll(async () => {
    ({ module, rootNode, source } = await beforeAllHelper(__filename, {
      parse: true,
    }));

    tellFortune = module.tellFortune;

    rootNode &&
      simple(rootNode, {
        VariableDeclarator({ id, init }) {
          if (id.type === 'Identifier' && init?.type === 'ArrayExpression') {
            state[id.name] = init.elements
              .filter((elem) => elem?.type === 'Literal')
              .map((elem) => elem.value);
          }
        },
        FunctionDeclaration(node) {
          if (node?.id?.name === 'tellFortune') {
            state.tellFortuneParams = node.params
              .filter((param) => param.type === 'Identifier')
              .map((param) => param.name);
          }
        },
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'selectRandomly' &&
            node.arguments.length > 0
          ) {
            if (node.arguments[0].type === 'Identifier')
              state.selectRandomlyParams.push(node.arguments[0].name);
          }
        },
      });
  });

  test('should exist and be executable', () => {
    expect(tellFortune).toBeDefined();
  });

  testTodosRemoved(() => source);

  testNoConsoleLog('tellFortune', () => rootNode);

  test('should take four parameters', () => {
    expect(tellFortune).toHaveLength(4);
  });

  test('should call function `selectRandomly` for each of its arguments', () => {
    expect(state.selectRandomlyParams).toBeDefined();
    expect(state.selectRandomlyParams).toEqual(
      expect.arrayContaining(state.tellFortuneParams)
    );
  });

  test('`numKids` should be an array initialized with 5 elements', () => {
    const { numKids } = state;
    expect(Array.isArray(numKids)).toBe(true);
    expect(numKids).toHaveLength(5);
  });

  test('`locations` should be an array initialized with 5 elements', () => {
    const { locations } = state;
    expect(Array.isArray(locations)).toBe(true);
    expect(locations).toHaveLength(5);
  });

  test('`partnerNames` should be an array initialized with 5 elements', () => {
    const { partnerNames } = state;
    expect(Array.isArray(partnerNames)).toBe(true);
    expect(partnerNames).toHaveLength(5);
  });

  test('`jobTitles` should be an array initialized with 5 elements', () => {
    const { jobTitles } = state;
    expect(Array.isArray(jobTitles)).toBe(true);
    expect(jobTitles).toHaveLength(5);
  });

  test('should tell the fortune by randomly selecting array values', () => {
    expect(tellFortune).toBeDefined();
    const { numKids, partnerNames, locations, jobTitles } = state;

    const spy = jest.spyOn(Math, 'random').mockReturnValue(0);

    const received = tellFortune(
      numKids!,
      partnerNames!,
      locations!,
      jobTitles!
    );

    expect(
      spy.mock.calls.length === 4
        ? ''
        : 'selectRandomly() is not called the expected number of times'
    ).toBe('');
    spy.mockRestore();

    expect(received).toBe(
      `You will be a ${jobTitles?.[0]} in ${locations?.[0]}, married to ${partnerNames?.[0]} with ${numKids?.[0]} kids.`
    );
  });
});
