# Test Automation Architecture

## Introduction

This repository includes infrastructure for the automatic checking (unit testing and linting) of homework exercises for use by both students and homework reviewers. This document describes the setup of this infrastructure.

## Running the tests

A test can be executed by running the command:

```
npm test
```

This brings up a test menu, for instance:

```
? Which module? 1-JavaScript
? Which week? Week3
? Which exercise? ex1-giveCompliment
You have not yet worked on this exercise.

*** Unit Test Error Report ***

- giveCompliment should give a random compliment: You are `compliment`, `name`!
- giveCompliment should contain a `const` array named `compliments` with 10 strings

No linting errors detected.
```

Analysis:

- The starter code of the exercise has not yet been modified by the student as indicated by the message _You have not yet worked on this exercise_.

- The **Unit Test Error Report** lists the failing unit tests.

- The **ESLint Report** lists the linting errors detected by ESLint.

A report file containing the same messages is written to the corresponding `Week` folder that contains the exercise, in this example that would be the `Week3/homework-reports` folder. The name of the report file starts with the name of the exercise followed by a suffix that indicates the status of the test:

<!-- prettier-ignore -->
| Name | Status |
| ---- | ------ |
| `<exercise>.todo.txt` | The tests for this exercise have not yet been executed. |
| `<exercise>.pass.txt` | All unit tests passed and no linting errors were detected. |
| `<exercise>.fail.txt` | Unit test errors or linting errors have been detected. |

For example:

- creditNumberValidator.todo.txt _or_
- creditNumberValidator.pass.txt _or_
- creditNumberValidator.fail.txt

These files are mutually exclusive; after running a test any existing report file is erased before a new one is created. However, if a student runs a test against an unmodified (i.e., pristine) exercise the default `.todo.txt` file remains in place.

The report folders are tracked by Git and are part of the pull requests submitted by students. Students are required to run the relevant tests prior to submitting their PR for the current week. Running the tests gives them early feedback on the correctness of the expected results and conformance to the mandated coding style (as per ESLint), and an early opportunity for corrective action. Once submitted as a PR, it also gives pull request reviewers a head start in gaining insight in the correctness of the homework, although manual inspection is of course still required.

## Configuration

The directory names for the curriculum modules in should be defined in `test-automation/modules.json`. For example:

```json
["1-JavaScript", "2-Browsers", "3-UsingAPIs"]
```

The test facility relies on adherence to a specific naming convention and directory structure as illustrated in the table below.

<!-- prettier-ignore -->
Folder | Description |
------ | ----------- |
`<module-name>/Week𝑛/homework` | The JavaScript file representing the exercise name must named `<exercise-name>.js`. However, if the exercise consists of multiple files (e.g. a browser-based exercise) then exercise name must be used to name the _folder_ containing the relevant files.
`<module-name>/Week𝑛/unit-tests` | The JavaScript file containing the unit test(s) for the exercise must named `<exercise-name>.test.js`.

ESLint rules are configured as usual in the file `.eslintrc.js`. It is possible to define a hierarchy of `.eslintrc.js` files if certain exercise require custom ESLint rules. See [ESLint: Configuration Cascading and Hierarchy](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy).

## Preparation

A number of folders and files are automatically created by means of a `postinstall` script in `package.json`. This script is run automatically after `npm install` has completed installing the dependencies defined in `package.json`. The process is steered by the same `config.json` file mentioned earlier.

In each `Week` folder listed in `config.json` a subfolder `homework-reports` is created. Inside each `homework-reports` folder one or more `.todo.txt` report files are created, one for each test of the corresponding week. The resulting structure thus looks like this:

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

Furthermore, a file `.hashes.json` is created in the `test-automation` folder that contains a JSON object with the computed hashes of the `.js` file contents of the exercises. This information is used to determine whether an exercise file (or files) is modified. Note that this file is not tracked by Git (it is listed in `.gitignore`).
