# Test Automation

## Introduction

This repository includes infrastructure for the automatic checking (unit testing, linting and spell-checking) of homework exercises for use by both students and homework reviewers. This document describes the setup of this infrastructure.

## Running the tests

Tests are expected to be executed one at a time. with the command:

```
npm test
```

A test is selected by going through a series of prompts, for instance:

```
? Which module? 1-JavaScript
? Which week? Week3
? Which exercise? ex1-giveCompliment
You have not yet worked on this exercise.
Running test, please wait...

*** Unit Test Error Report ***

- giveCompliment should contain a `const` array named `compliments` with 10 strings
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
| **_\<exercise>_.todo.txt** | The tests for this exercise have not yet been executed. |
| **_\<exercise>_.pass.txt** | All unit tests passed and no linting errors were detected. |
| **_\<exercise>_.fail.txt** | Unit test errors or linting errors have been detected. |

For example:

- `creditNumberValidator.todo.txt` _or_
- `creditNumberValidator.pass.txt` _or_
- `creditNumberValidator.fail.txt`

These files are mutually exclusive; after running a test any previous report file is erased before a new one is created. However, if a student runs a test against a still untouched exercise the default `.todo.txt` file remains in place.

The report folders are tracked by Git and are part of the pull requests submitted by students. Students are required to run the relevant tests prior to submitting their PR for the current week. Running the tests gives them early feedback on the correctness of the expected results and conformance to the mandated coding style (as per ESLint), and an early opportunity for corrective action. Once submitted as a PR, it also gives pull request reviewers a head start in gaining insight in the correctness of the homework, although manual inspection is of course still required.

### Test log file

Test results along with other events are also logged in a `<email>.log` file in the root of the project folder, where `<email>` is the user's Git email address. This log file is tracked in Git and can be used by students and mentor to review the testing history.

## Directory Structure

The test runner relies on strict adherence to a predefined naming convention and directory structure as detailed in the table below.

<!-- prettier-ignore -->
Folder | Description |
------ | ----------- |
**_\<module>_/Week𝑛/homework**| Example: `1-JavaScript/Week3/homework`<br><br>The JavaScript file representing the exercise must named `<exercise-name>.js` and placed in this folder. However, if the exercise consists of multiple files (e.g. a browser-based exercise) then these files must be placed in a _folder_ named `<exercise-name>`.<br><br>There can be multiple exercises per _Week𝑛_ folder.
**_\<module>_/Week𝑛/unit-tests** | This folder contains the unit test JavaScript files. The JavaScript file containing the unit test(s) for ab exercise must named `<exercise-name>.test.js`.

## Linting

ESLint rules are configured as usual in the file `.eslintrc.js`. It is possible to define a hierarchy of `.eslintrc.js` files if certain exercise require custom ESLint rules. See also [ESLint: Configuration Cascading and Hierarchy](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy).

## Postinstall Script

A number of folders and files are automatically created by means of a `postinstall` script in `package.json`. This script is run after `npm install` has completed installing the dependencies defined in `package.json`.

In each _Week𝑛_ folder a subfolder `test-reports` is created. Inside each `test-reports` folder one or more `.todo.txt` report files are created, one for each test of the corresponding week. The resulting structure thus looks like this:

```
1-JavaScript/
  Week3/
    homework/
      creditNumberValidator.js
    test-reports/
      creditNumberValidator.todo.txt
    unit-tests/
      creditNumberValidator.test.js
```

Furthermore, a file `.hashes.json` is created in the `test-automation` folder that contains a JSON object with hashes computed over of the `.js` file(s) of the exercises, one hash per exercise. This information is used to detect whether the starter code of the exercise has been modified since initial installation. Note that `.hashes.json` is not tracked by Git (it is listed in `.gitignore`).

## Cleanup

A cleanup script is provided for use by the mentors maintaining this repo. This script must be run before committing changes, to ensure that test reports and log files created during development and testing are cleaned up and thus not included in the Git repo. Because these files need to be Git-tracked when students run the tests they cannot be listed in `.gitignore`.

## Exercises and Unit Tests

Simple _Node_-based exercises, consisting of a single JavaScript file should include a `module.exports` object at the bottom of the file that exports a function that represents the exercise. For example:

Exercise: `ex5-creditNumberValidator.js`

```js
//...

function validateCreditCardNumber(/* argument(s) go here*/) {
  // add your code here
}

// Do not modify or delete anything below this line
module.exports = {
  validateCreditCardNumber,
};
```

The corresponding unit test can `require` this function in order to test it.

Unit test: `ex5-creditNumberValidator.test.js`

```js
const {
  validateCreditCardNumber,
} = require("../homework/creditNumberValidator");

describe("validateCreditCardNumber", () => {
  it("should accept 9999777788880000", () => {
    expect(validateCreditCardNumber("9999777788880000")).toBe(true);
  });
  //...
});
```

### Code Analysis

More sophisticated unit test can use code analysis to inspect the actual code of the exported function. JavaScript provides access to a function's code by calling `.toString()` on the function, e.g.:

```js
const { giveCompliment } = require("../homework/ex1-giveCompliment");

// ...

const source = giveCompliment.toString();
```

The `acorn` npm package included in this repo can be used to build an _Abstract Syntax Tree_ (AST) from the function's source code. This AST can then be queried and/or traversed using the included `acorn-walk` package.

To find out which nodes of the AST of a acceptable solution need to be minimally present we can use the online [AST Explorer](https://astexplorer.net/) to examine the AST of a model solution (which of course requires that we create such a module solution in the first place).

#### Exercise Example

**Instructions**

- Write a function named `giveCompliment`.
  > - It takes 1 argument: your name.
  >   -Inside the function define a variable that holds an array, `compliments`, with 10 strings.
  > - Each string should be a compliment, like "great", "awesome".
  > - Write code that randomly selects a compliment.
  > - Return a string: "You are `compliment`, `your name`!
  > - Call the function three times, giving each function call the same argument: your name.

**Model solution**

File: `ex1-giveCompliment.js`

```js
"use strict";

function giveCompliment(name) {
  const compliments = [
    "great",
    "awesome",
    "lovely",
    "marvelous",
    "groovy",
    "exciting",
    "cool",
    "excellent",
    "smart",
    "nice",
  ];

  const compliment =
    compliments[Math.floor(Math.random() * compliments.length)];
  return `You are ${compliment}, ${name}!`;
}

console.log(giveCompliment("Nancy"));
console.log(giveCompliment("Nancy"));
console.log(giveCompliment("Nancy"));

module.exports = {
  giveCompliment,
};
```

There are a couple of things we can test here:

1. The function should produce a correctly formatted (random) compliment.
2. The function should include an array named `compliments` initialized with 10 strings.
3. Because we expect a randomly selected compliment we expect the `Math.random()` method to be called.

To inspect the AST for the `giveCompliments` function we can load the function's source code from the module solution in the [AST Explorer](https://astexplorer.net/), shown in the picture below.

Here we can see that we expect the AST to include a `VariableDeclarator` containing an `Identifier` with a `name` of `compliments` and initialized with an `ArrayExpression` containing 10 `'Literal` nodes.

![AST Explorer](./assets/ast-explorer.png)

The AST is simple a large JavaScript object containing a hierarchy of _node_ objects that conform to the [ESTree Spec](https://github.com/estree/estree). Of most interest are [es5.ms](https://github.com/estree/estree/blob/master/es5.md) and [es2015.md](https://github.com/estree/estree/blob/master/es2015.md).

Using this knowledge we can now write a unit test that incorporates code analysis as shown in the listing below.

1. The model solution includes `console.log` statement that we do not wish to appear when running the unit test. For that purpose we can temporarily replace `console.log` with an empty mock implementation before dynamically `require`-ing the exercise file. This is shown in the code fragment below, which also shows how to extract the source code of the exercise function and build an AST from it, using `acorn.parse`.

2. We use `walk.findNodeAfter` to look, starting from the root node, for the presence of a `VariableDeclarator` node with the name `compliments`, initialized with an `ArrayExpression`.

3. To make `Math.random()` predictable, we use a mock implementation that always returns zero. Therefore we expect the exercise function to always use the first element of the `compliments` array. We can retrieve that actual literal value of that element from the AST.

4. We expect `Math.random()` to have been called.

5. The test runner does not display the normal (elaborate and potentially confusing) output from Jest. Instead, by default, only the title of the test (the first argument of the `it` function) is displayed for a failing test. This is accomplished by means of a _Custom Reporter_ (`CustomerReporter.js`). To display custom messages in addition to the test title, the custom reporter looks for a call to `expect` as follows:
   ```js
   expect(message).toBe("");
   ```
   If the `message` is not the empty string it will be displayed in addition to the title.

File: `ex1-giveCompliment.test.js`

```js
describe("giveCompliment", () => {
  let giveCompliment;
  let rootNode;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({ giveCompliment } = require("../homework/ex1-giveCompliment"));
    spy.mockRestore();
    const source = giveCompliment.toString();
    rootNode = acorn.parse(source, { ecmaVersion: 2020 });
  });

  //...

  it("should give a random compliment: You are `compliment`, `name`!", () => {
    const found = walk.findNodeAfter(rootNode, 0, (type, node) => {
      return (
        type === "VariableDeclarator" &&
        node.id.name === "compliments" &&
        node.init &&
        node.init.type === "ArrayExpression"
      );
    });

    expect(found).toBeDefined();

    const compliments = found.node.init.elements.map((elem) => elem.value);
    const compliment = compliments[0];

    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0);
    const received = giveCompliment("Nancy");

    expect(mathRandomSpy).toHaveBeenCalled();
    mathRandomSpy.mockRestore();

    const expected = `You are ${compliment}, Nancy!`;
    const message =
      received === expected
        ? ""
        : `\n  Expected: ${expected}\n  Received: ${received}`;
    expect(message).toBe("");
  });
});
```
