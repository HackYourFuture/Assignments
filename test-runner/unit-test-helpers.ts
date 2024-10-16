import { CallExpression, MemberExpression, Node, parse } from 'acorn';
import { ancestor } from 'acorn-walk';
import fs from 'fs';
import path from 'path';

type HelperOptions = {
  noParse?: boolean;
  noImport?: boolean;
};

const defaultOptions: HelperOptions = {
  noParse: false,
  noImport: false,
};

export type ExerciseInfo = {
  source: string;
  module?: any;
  rootNode?: Node;
};

export async function beforeAllHelper(
  testFilePath: string,
  options: HelperOptions = {}
): Promise<ExerciseInfo> {
  const helperOptions = Object.assign(defaultOptions, options);
  const matches = testFilePath
    .replace(/\\/g, '/')
    .match(/^.*\/(.+)\/(Week\d)\/.+\/(.+)\.test\.js$/i);

  if (!matches) {
    throw new Error(`Unexpected test path: ${testFilePath}`);
  }

  const [, module, week, exercise] = matches;
  let exercisePath = path.join(
    __dirname,
    `../../${module}/${week}/assignment/${exercise}`
  );

  exercisePath = fs.existsSync(exercisePath)
    ? path.join(exercisePath, 'index.js')
    : exercisePath + '.js';

  const result: ExerciseInfo = { source: '' };

  if (!helperOptions.noImport) {
    try {
      // suppress all console.log output
      jest.spyOn(console, 'log').mockImplementation();
      result.module = await import(exercisePath);
    } catch (err) {
      console.log("Error attempting to 'import':", err);
    }
  }

  result.source = fs.readFileSync(exercisePath, 'utf8');

  if (!helperOptions.noParse) {
    try {
      result.rootNode = parse(result.source, {
        ecmaVersion: 2022,
        sourceType: 'module',
      });
    } catch (_) {
      // Leave rootNode prop undefined
    }
  }

  return result;
}

export function findAncestor(type: string, ancestors: any) {
  let index = ancestors.length - 1;
  while (index >= 0) {
    if (ancestors[index].type === type) {
      return ancestors[index];
    }
    index--;
  }
  return null;
}

export type OnLoadState = {
  onload: boolean;
  callError: boolean;
};

export function onloadValidator(state: OnLoadState) {
  return (node: Node, ancestors: any) => {
    const { object, property } = node as MemberExpression;
    if (
      object.type === 'Identifier' &&
      object.name === 'window' &&
      property.type === 'Identifier'
    ) {
      if (property.name === 'addEventListener') {
        const callExpression = findAncestor('CallExpression', ancestors);
        if (callExpression) {
          if (callExpression.arguments.length === 2) {
            if (
              ['load', 'DOMContentLoaded'].includes(
                callExpression.arguments[0].value
              )
            ) {
              state.onload = true;
            }
            if (callExpression.arguments[1].type === 'CallExpression') {
              state.callError = true;
            }
          }
        }
      } else if (property.name === 'onload') {
        const assignmentExpression = findAncestor(
          'AssignmentExpression',
          ancestors
        );
        if (assignmentExpression) {
          state.onload = true;
          if (assignmentExpression.right.type === 'CallExpression') {
            state.callError = true;
          }
        }
      }
    }
  };
}

export function testTodosRemoved(getSource: () => string) {
  test('should have all TODO comments removed', () => {
    expect(/\bTODO\b/.test(getSource())).toBeFalsy();
  });
}

export function testNoConsoleLog(
  functionName: string,
  getRootNode: () => Node
) {
  test(`\`${functionName}\` should not contain unneeded console.log calls`, () => {
    const rootNode = getRootNode();
    let callsConsoleLog = false;
    rootNode &&
      ancestor(rootNode, {
        CallExpression({ callee }: CallExpression, ancestors: any) {
          if (
            callee.type === 'MemberExpression' &&
            callee.object.type === 'Identifier' &&
            callee.object.name === 'console' &&
            callee.property.type === 'Identifier' &&
            callee.property.name === 'log'
          ) {
            const functionDeclaration = findAncestor(
              'FunctionDeclaration',
              ancestors
            );
            if (
              functionDeclaration !== null &&
              functionDeclaration.type === 'FunctionDeclaration' &&
              functionDeclaration.id.type === 'Identifier'
            ) {
              if (functionDeclaration.id.name === functionName) {
                callsConsoleLog = true;
                return;
              }
            }

            const variableDeclarator = findAncestor(
              'VariableDeclarator',
              ancestors
            );
            if (
              variableDeclarator !== null &&
              variableDeclarator.type === 'VariableDeclarator' &&
              variableDeclarator.id.type === 'Identifier'
            ) {
              if (variableDeclarator.id.name === functionName) {
                callsConsoleLog = true;
              }
            }
          }
        },
      });

    expect(callsConsoleLog).toBe(false);
  });
}

export function createTimeoutSpy() {
  return jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
    cb();
    return 1 as unknown as NodeJS.Timeout;
  });
}
