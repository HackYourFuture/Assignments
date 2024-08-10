// @ts-check
import acorn from 'acorn';
import walk from 'acorn-walk';
import fs from 'fs';
import path from 'path';

/**
 * @typedef {Object} HelperOptions
 * @property {boolean} [parse]
 * @property {boolean} [noRequire]
 */

/** @type {HelperOptions} */
const defaultOptions = {
  parse: false,
  noRequire: false,
};

/** @typedef {{module?: any, source: string, rootNode?: acorn.Node}} ExerciseData */

/**
 *
 * @param {string} testFilePath
 * @param {HelperOptions} options
 * @returns {Promise<ExerciseData>}
 */
export async function beforeAllHelper(testFilePath, options = {}) {
  const helperOptions = Object.assign(defaultOptions, options);
  const matches = testFilePath
    .replace(/\\/g, '/')
    .match(/^.*\/(.+)\/(Week\d)\/.+\/(.+)\.test\.js$/i);

  if (!matches) {
    throw new Error(`Unexpected test path: ${testFilePath}`);
  }

  const homeworkFolder = process.env.ASSIGNMENT_FOLDER || 'assignment';

  const [, module, week, exercise] = matches;
  let exercisePath = path.join(
    __dirname,
    `../${module}/${week}/${homeworkFolder}/${exercise}`
  );

  exercisePath = fs.existsSync(exercisePath)
    ? path.join(exercisePath, 'index.js')
    : exercisePath + '.js';

  /** @type {ExerciseData} */
  const result = {};

  if (!helperOptions.noRequire) {
    try {
      // suppress all console.log output
      jest.spyOn(console, 'log').mockImplementation();
      result.module = await import(exercisePath);
    } catch (err) {
      console.log('Error attempting to `require`:', err);
    }
  }

  result.source = fs.readFileSync(exercisePath, 'utf8');

  if (helperOptions.parse) {
    try {
      result.rootNode = acorn.parse(result.source, {
        ecmaVersion: 2022,
        sourceType: 'module',
      });
    } catch (_) {
      // Leave rootNode prop undefined
    }
  }

  return result;
}

/**
 *
 * @param {string} type
 * @param {any} ancestors
 * @returns
 */
export function findAncestor(type, ancestors) {
  let index = ancestors.length - 1;
  while (index >= 0) {
    if (ancestors[index].type === type) {
      return ancestors[index];
    }
    index--;
  }
  return null;
}

/**
 * @typedef {{onload: boolean, callError: boolean}} OnLoadState
 *
 */

/**
 *
 * @param {OnLoadState} state
 * @returns
 */
export function onloadValidator(state) {
  return ({ object, property }, ancestors) => {
    if (object.name === 'window' && property.type === 'Identifier') {
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

/**
 *
 * @param {() => string} getSource
 */
export function testTodosRemoved(getSource) {
  test('should have all TODO comments removed', () => {
    expect(/\bTODO\b/.test(getSource())).toBeFalsy();
  });
}

/**
 *
 * @param {string} functionName
 * @param {() => acorn.Node} getRootNode
 */
export function testNoConsoleLog(functionName, getRootNode) {
  test(`\`${functionName}\` should not contain unneeded console.log calls`, () => {
    const rootNode = getRootNode();
    let callsConsoleLog = false;
    rootNode &&
      walk.ancestor(rootNode, {
        CallExpression({ callee }, ancestors) {
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
