# Test Automation

## Introduction

This repository includes infrastructure for the automatic checking (unit testing, linting and spell-checking) of homework exercises, for use by both students and homework reviewers. This document describes this infrastructure.

## Running the tests

Tests are expected to be executed one at a time, with the command:

```text
npm test
```

A test is selected by going through a series of prompts, for instance:

```text
? Which module? 1-Javascript
? Which week? Week3
? Which exercise? ex1-giveCompliment
You have not yet worked on this exercise.
Running test, please wait...

*** Unit Test Error Report ***

- giveCompliment should take a single parameter
- giveCompliment should include a `compliments` array initialized with 10 strings
  No such array found
- giveCompliment should give a random compliment: You are `compliment`, `name`!

No linting errors detected.
No spelling errors detected.
```

Analysis:

- The starter code of the exercise has not yet been modified by the student as indicated by the message _You have not yet worked on this exercise_.

- There were two failing unit tests.

- No linting warnings or errors were detected.

- No spelling errors were detected.

### Report files

A report file containing these same messages is written to the corresponding `Week` folder that contains the exercise, in this example that would be the `1-JavaScript/Week3/test-reports` folder. The name of the report file starts with the name of the exercise followed by a suffix that indicates the status of the test:

<!-- prettier-ignore -->
| Name | Status |
| ---- | ------ |
| `<exercise>.todo.txt` | The test for this exercise have not yet been executed or has been executed on unmodified code. |
| `<exercise>.pass.txt` | All unit tests passed and no linting or spelling errors were detected. |
| `<exercise>.fail.txt` | Unit test errors or ESLint or spelling errors were detected. |

For example:

- `ex1-giveCompliment.todo.txt` _or_
- `ex1-giveCompliment.pass.txt` _or_
- `ex1-giveCompliment.fail.txt`

These files are mutually exclusive; after running a test any previous report file for that test is erased before a new one is created. However, if a student runs a test against a still untouched exercise the default `.todo.txt` file remains in place.

The report folders are tracked by Git and are part of the pull requests submitted by students. Students are expected to run the relevant tests prior to submitting their PR for the current week. Running a test should give them early feedback on the correctness of the expected results and on the conformance to the mandated coding style (as per ESLint). This gives them an early opportunity for corrective action. Once submitted as a PR, the report files also gives pull request reviewers some key pointers into the correctness of the homework before going into a more elaborate visual inspection of the actual code.

### Test log file

Test results along with other events are also logged in a `<email>.log` file in the root of the project folder, where `<email>` is the user's Git email address. This log file is tracked in Git and can be used by students and mentor to review the testing history.

## Directory Structure

The test runner relies on strict adherence to a predefined naming convention and directory structure as detailed in the table below.

<!-- prettier-ignore -->
Folder | Description |
------ | ----------- |
`<module>/Week𝑛/homework` | Example: `1-JavaScript/Week3/homework`<br><br>The JavaScript file representing the exercise must named `<exercise-name>.js` and placed in this folder. However, if the exercise consists of multiple files (e.g. a browser-based exercise) then these files must be placed in a _folder_ named `<exercise-name>`.<br><br>There can be multiple exercises per _Week𝑛_ folder.
`<module>/Week𝑛/unit-tests` | This folder contains the unit test JavaScript files. The JavaScript file containing the unit test(s) for ab exercise must named `<exercise-name>.test.js`.
`<module>/Week𝑛/test-reports` | This folder will hold the test reports.
`<module>/Week𝑛/.homework` | This folder (notice the leading dot in the name) is only used during development and maintenance of this repo. Working solutions to exercises can be placed in this folder for testing the "happy" path of the unit tests. A `.homework` folder is used in place of a regular `homework` folder when a unit test is run with the command: `npm run testx`.

## Linting

ESLint rules are configured as usual in the file `.eslintrc.js`. It is possible to define a hierarchy of `.eslintrc.js` files if certain exercise require custom ESLint rules. See also [ESLint: Configuration Cascading and Hierarchy](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy).

## Postinstall Script

An npm `postinstall` script is automatically executed as part of the installation process. This script regenerates the `test-report` folders, initialized with `.todo.txt` files and erases any existing `<email>.log` file.

Furthermore, a file `.hashes.json` is created in the `test-runner` folder that contains a JSON object with hashes computed over of the `.js` file(s) of the exercises, one hash per exercise. This information is used to detect whether the starter code of the exercise has been modified since initial installation. Note that `.hashes.json` is git-ignored.

After running the `postinstall` script the resulting structure for a module looks similar to this:

```text
1-JavaScript/
  Week3/
    homework/
      ex1-giveCompliment.js
      ...
    test-reports/
      ex1-giveCompliment.todo.txt
      ...
    unit-tests/
      ex1-giveCompliment.test.js
      ...
```

## Cleanup

The `postinstall` script must be run before committing changes to the master repo to ensure that all test reports are restored to the default `.todo.txt` files and the log file, if present, is cleaned up:

```text
npm run postinstall
```

## Exercises and Unit Tests

Simple _Node_-based exercises, consisting of a single JavaScript file, should include a `module.exports` object at the bottom of the file that exports a function to be test. For example:

```js
function doubleEvenNumbers(numbers) {
  // TODO: rewrite the function body using `map` and `filter`.
}

// ! Do not change or remove the code below
module.exports = doubleEvenNumbers;
```

The corresponding unit test can `require` this function in order to test it. Because many exercises in the JavaScript module include calls to `console.log` that we do not want to show up while running a test, the `require` is executed dynamically, with `console.log` being mocked for the duration of the `require`. This is done through the helper function `beforeAllHelper` in `unit-test-helper.js`. This function also reads the exercise file as text and (optionally) builds an AST (Abstract Syntax Tree) to enable static code analysis.

```js
describe("doubleEvenNumbers", () => {
  let doubleEvenNumbers;
  const state = {};

  beforeAll(() => {
    const { exports, rootNode } = beforeAllHelper(__filename, {
      parse: true,
    });
    doubleEvenNumbers = exports;

    // ...
  });

  // ...
});
```

### Code Analysis

More sophisticated unit test can use static code analysis to inspect the actual code of the exported function. For instance, in the `doubleEvenNumber` exercise the `for` loop from the existing (working) code should be replaced with `map` and `filter`. There no way to check this from the runtime context. Here, static code analysis can come to the rescue.

First of all (and this goes for exercises to be unit-tested), we must have a working model solution to analyze. For instance:

```js
function doubleEvenNumbers(numbers) {
  return numbers.filter((num) => num % 2 === 0).map((num) => num * 2);
}
```

We can use the online [AST Explorer](https://astexplorer.net/) to examine the AST of a model solution. This is illustrated in Figure 1 below. The AST tree is actually a large, hierarchical JavaScript/JSON object that consist of **ESTree** "nodes".

> See [ESTree Spec](https://github.com/estree/estree). Of most interest are [es5.ms](https://github.com/estree/estree/blob/master/es5.md) and [es2015.md](https://github.com/estree/estree/blob/master/es2015.md).

By expanding and examining the nodes in the AST we can see that we can expect `MemberExpression` nodes with a `property.name` of `"map"` and `"filter"` respectively. With this knowledge we can now write some code to "walk" the AST, looking for these `MemberExpression` nodes. (The actual code for this unit test also checks wether `map` and `filter` are used _within_ the scope of `doubleEvenNumbers`.)

```js
// ...
let rootNode;
const state = {};

beforeAll(() => {
  let exports;
  ({ exports, rootNode } = beforeAllHelper(__filename, {
    parse: true,
  }));
  doubleEvenNumbers = exports;

  // Look for `map` and `filter` calls inside the
  // scope of the `doubleEvenNumber` function
  rootNode &&
    walk.simple(rootNode, {
      MemberExpression({ property }, ancestors) {
        if (["map", "filter"].includes(property.name)) {
          state[property.name] = true;
        }
      },
    });
});
```

We can now write simple unit tests to check for the mandated existence of `map` and `filter`:

```js
it("should use `map`", () => {
  expect(state.map).toBeDefined();
});

it("should use `filter`", () => {
  expect(state.filter).toBeDefined();
});
```

This completes the code analysis for this exercise example.

![AST Explorer](./assets/ast-explorer.png)
Figure 1: AST (Abstract Syntax Tree) of the function `doubleEvenNumbers`.
