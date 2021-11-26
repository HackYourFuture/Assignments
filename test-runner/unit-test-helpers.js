const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

const defaultOptions = {
  parse: false,
  noRequire: false,
};

function beforeAllHelper(testFilePath, options = {}) {
  options = Object.assign(defaultOptions, options);
  const matches = testFilePath
    .replace(/\\/g, '/')
    .match(/^.*\/(.+)\/(Week\d)\/.+\/(.+)\.test\.js$/i);
  if (!matches) {
    throw new Error(`Unexpected test path: ${testFilePath}`);
  }

  const homeworkFolder = process.env.HOMEWORK_FOLDER || 'homework';

  const [, module, week, exercise] = matches;
  let exercisePath = path.join(
    __dirname,
    `../${module}/${week}/${homeworkFolder}/${exercise}`
  );

  exercisePath = fs.existsSync(exercisePath)
    ? path.join(exercisePath, 'index.js')
    : exercisePath + '.js';

  const result = {};

  if (!options.noRequire) {
    try {
      // suppress all console.log output
      jest.spyOn(console, 'log').mockImplementation();
      result.exported = require(exercisePath);
    } catch (err) {
      console.log('Error attempting to `require`:', err);
    }
  }

  result.source = fs.readFileSync(exercisePath, 'utf8');

  if (options.parse) {
    try {
      result.rootNode = acorn.parse(result.source, { ecmaVersion: 2020 });
    } catch (_) {
      // Leave rootNode prop undefined
    }
  }

  return result;
}

function findAncestor(type, ancestors) {
  let index = ancestors.length - 1;
  while (index >= 0) {
    if (ancestors[index].type === type) {
      return ancestors[index];
    }
    index--;
  }
  return null;
}

function onloadValidator(state) {
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

function testTodosRemoved(getSource) {
  test('should have all TODO comments removed', () => {
    expect(/\bTODO\b/.test(getSource())).toBeFalsy();
  });
}

function testNoConsoleLog(functionName, getRootNode) {
  test(`\`${functionName}\` should not contain unneeded console.log calls`, () => {
    const rootNode = getRootNode();
    let callsConsoleLog = false;
    rootNode &&
      walk.ancestor(rootNode, {
        CallExpression({ callee }, ancestors) {
          if (
            callee.object?.name === 'console' &&
            callee.property?.name === 'log'
          ) {
            const functionDeclaration = findAncestor(
              'FunctionDeclaration',
              ancestors
            );
            if (functionDeclaration?.id?.name === functionName) {
              callsConsoleLog = true;
              return;
            }
            const variableDeclarator = findAncestor(
              'VariableDeclarator',
              ancestors
            );
            if (variableDeclarator?.id?.name === functionName) {
              callsConsoleLog = true;
            }
          }
        },
      });

    expect(callsConsoleLog).toBe(false);
  });
}

module.exports = {
  beforeAllHelper,
  findAncestor,
  onloadValidator,
  testTodosRemoved,
  testNoConsoleLog,
};
