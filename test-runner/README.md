# Test Automation

## Introduction

This repository includes infrastructure for the automatic checking (unit testing, linting and spell-checking) of homework assignments, for use by both trainees and homework reviewers. This document describes this infrastructure.

## Running the tests

Tests are expected to be executed one at a time, with the command:

```text
npm test
```

A test is selected by going through a series of prompts, for instance:

```text
? Which module? 1-JavaScript
? Which week? Week2
? Which exercise? ex1-giveCompliment
Running test, please wait...
 PASS  .dist/1-JavaScript/Week2/unit-tests/ex1-giveCompliment.test.js
  js-wk2-ex1-giveCompliment
    √ should exist and be executable (2 ms)
    √ should have all TODO comments removed
    √ `giveCompliment` should not contain unneeded console.log calls
    √ should take a single parameter (1 ms)
    √ should include a `compliments` array inside its function body
    √ the `compliments` array should be initialized with 10 strings (1 ms)
    √ should give a random compliment: You are `compliment`, `name`! (4 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.882 s, estimated 1 s
Ran all test suites matching /H:\\dev\\hackyourfuture\\Assignments\\.dist\\1-JavaScript\\Week2\\unit-tests\\ex1-giveCompliment.test.js/i.

No linting errors detected.
No spelling errors detected.
```

### Report files

A report file containing these same messages is written to the corresponding `Week` folder that contains the exercise, in this example that would be the `1-JavaScript/Week3/test-reports` folder. The name of the report file starts with the name of the exercise followed by a suffix that indicates the status of the test:

<!-- prettier-ignore -->
| Name | Status |
| ---- | ------ |
| `<exercise>.pass.txt` | All unit tests passed and no linting or spelling errors were detected. |
| `<exercise>.fail.txt` | Unit test, ESLint and/or spelling errors were detected. |

For example:

- `ex1-giveCompliment.pass.txt` _or_
- `ex1-giveCompliment.fail.txt`

These files are mutually exclusive. After running a test an existing previous report file for that test is erased before a new one is created.

Trainees are expected to run the relevant tests and include the generated test reports in the pull request for the current week. Running a test gives them early feedback on the correctness of the expected results and on conformance to the mandated coding style (as per ESLint). This provides them an early opportunity for corrective action. Once submitted as part of a PR, the report files give pull request reviewers some key indicators into the correctness of the homework while doing a more elaborate visual inspection of the actual code.

### Test log file

Test results along with other events are also logged (i.e. appended) in a `test-runner.log` file in the root of the project folder. This log file is tracked in Git and can be used by students and mentors to review the testing history.

## Directory Structure

The test runner relies on strict adherence to a predefined naming convention and directory structure as detailed in the table below.

<!-- prettier-ignore -->
| Folder | Description |
| ------ | ----------- |
| `<module>/Week𝑛/assisgment` | Example: `1-JavaScript/Week3/assignment`<br><br>The JavaScript file representing the exercise must named `<exercise-name>.js` and placed in this folder. However, if the exercise consists of multiple files (e.g. a browser-based exercise) then these files must be placed in a _folder_ named `<exercise-name>`. In this case, the main JavaScript file must be called `index.js`.<br><br>There can be multiple exercises per _Week𝑛_ folder. |
| `<module>/Week𝑛/unit-tests` | This folder contains the unit test (JavaScript or TypeScript) files. The JavaScript/TypeScript file containing the unit test(s) for an exercise must named `<exercise-name>.test.[jt]s`. Unit test files are optional. If not provided, the unit test step of the test runner is skipped.<br><br>Note that TypeScript unit tests are transpiled to JavaScript to a `.dist` folder in the project root, using an `npm postinstall` script. |
| `<module>/Week𝑛/test-reports` | This folder will hold the test reports. It is dynamically created on first need. |
| `<module>/Week𝑛/@assignment` | This folder (notice the leading `@`-sign in the name) is only used during development and maintenance of this repo. Working solutions to exercises can be placed in this folder to test the "happy" path of the unit tests. An `@assignment` folder is used in place of a regular `assignment` folder when a unit test is run with the command: `npm run testalt`.<br><br>Notes:<br><br>1. `@assignment` folders should not be committed and are therefore included in `.gitignore`.<br>2. To test the exercises from the `@assignment` folder, set the `ASSIGNMENT_FOLDER` environment variable to `@assignment`. (See `.env-example`.) |

## Linting

ESLint rules are configured as usual in the file `.eslintrc.js`. Should this be needed, it is possible to define a hierarchy of `.eslintrc.js` files if certain exercise require custom ESLint rules. See also [ESLint: Configuration Cascading and Hierarchy](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy).

## npm `postinstall` script

An npm `postinstall` script is automatically executed as part of the `npm install` process. This script simply transpiles all TypeScript files to the `.dist` folder.

## npm `clean` script

This script cleans out the `test-report` folders and `unit-test.log` file.

Furthermore, a file `.hashes.json` is created in the root folder that contains a JSON object with hashes computed over of the `.js` file(s) of the exercises, one hash per exercise. This information is used to detect whether the starter code of and exercise has been modified since initial installation.

To prevent trainees from accidentally running this script the `ENABLE_CLEANUP` environment variable must be set to "true" (see `.env-example`).

After running the `setup` script the resulting structure for a module looks similar to this:

## Exercises and Unit Tests

The repo is ECMAScript module based throughout. Simple _Node_-based exercises, consisting of a single JavaScript file, should `export` the function to be tested. For example:

```js
export function checkDoubleDigits(/* TODO add parameter(s) here */) {
  // TODO complete this function
}
```

The corresponding unit test can dynamically import this function in order to test it. Because many exercises include code that is executed immediately when the file is imported `console.log`, `setTimeout`, `setInterval` and `Math.random` are mocked to no-ops. This is done through the helper function `beforeAllHelper` in `unit-test-helper.js`. This function also reads the exercise file as text and (optionally) builds an AST (Abstract Syntax Tree) to enable static code analysis.

```ts
describe('api-wk1-ex2-checkDoubleDigits', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  let checkDoubleDigits: (num: number) => Promise<string>;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);

    checkDoubleDigits = exInfo.module?.checkDoubleDigits;
    // ...
  });

  // ...
});
```

### Static Code Analysis

More sophisticated unit test can use static code analysis to inspect the actual code of the exported function. For instance, in the `checkDoubleDigits` exercise we expect a new `Promise` to be created and `resolve()` and `reject()` to be called with a single parameter each. There no way to check this from the runtime context. Here, static code analysis can come to the rescue.

First of all (and this goes for exercises to be unit-tested), we must have a working model solution to analyze. For instance:

```js
export function checkDoubleDigits(number) {
  return new Promise((resolve, reject) => {
    if (number >= 10 && number <= 99) {
      resolve('This is a double digit number!');
    } else {
      reject(new Error(`Expected a double digit number but got ${number}`));
    }
  });
}
```

We can use the online [AST Explorer](https://astexplorer.net/) to examine the AST of a model solution. This is illustrated in Figure 1 below. The AST tree is actually a large, hierarchical JavaScript/JSON object that consist of **ESTree** "nodes".

> See [ESTree Spec](https://github.com/estree/estree). Of most interest are [es5.ms](https://github.com/estree/estree/blob/master/es5.md) and [es2015.md](https://github.com/estree/estree/blob/master/es2015.md).

By expanding and examining the nodes in the AST we can see that we can expect `NewExpression` node with a `callee.name` of `"Promise"`. Descending further down this node we can find two `CallExpression` nodes, with `callee.name` properties of respectively `resolve` and `reject`, each with an `argument` array of length 1.

The callback function passed to `beforeHelper` walks down the AST tree using the `simple()` function imported from `acorn-walk`. This function visits each node in the AST tree and will call a handler for each node if present in the object passed as its second parameter. We simply record facts of interest in a `state` object than we can subsequently inspect in individual `test()` functions.

```js
// ...
type State = {
  newPromise?: boolean;
  resolve?: number;
  reject?: number;
  [key: string]: any;
};

describe('api-wk1-ex2-checkDoubleDigits', () => {
  const state: State = {};

  let exInfo: ExerciseInfo;

  let checkDoubleDigits: (num: number) => Promise<string>;

  beforeAll(async () => {
    exInfo = await beforeAllHelper(__filename);

    checkDoubleDigits = exInfo.module?.checkDoubleDigits;

    exInfo.rootNode &&
      simple(exInfo.rootNode, {
        NewExpression({ callee }) {
          if (callee.type === 'Identifier' && callee.name === 'Promise') {
            state.newPromise = true;
          }
        },
        CallExpression({ callee, arguments: args }) {
          if (
            callee.type === 'Identifier' &&
            ['resolve', 'reject'].includes(callee.name)
          ) {
            state[callee.name] = args.length;
          }
        },
      });
  });

  test('should call new Promise()', () => {
    expect(state.newPromise).toBeDefined();
  });

  test('`resolve()` should be called with a one argument', () => {
    expect(state.resolve).toBe(1);
  });

  test('`reject()` should be called with a one argument', () => {
    expect(state.reject).toBe(1);
  });

```

![AST Explorer](./assets/ast-explorer.png)
Figure 1: AST (Abstract Syntax Tree) of the function `checkDoubleDigits`.

## Adding new exercises

To add a new exercise the following is needed:

1. A starter JavaScript file for a node-based exercise or an `index.html` and `index.js` file for a browser-based exercise.
2. An exercise section to be added to the README of the relevant Week folder.
3. An optional unit test file.

All files and folders should adhere to the naming conventions as described earlier in this document.

## Before Committing Changes

Use the `npm run clean` command before committing changes to the repo. This will clear up any test reports and (re-)generate the exercise hashes.
