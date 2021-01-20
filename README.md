# UNDER CONSTRUCTION.

## Installation

After forking and/or cloning this repository execute the following command from the command line to install all software prerequisites:

```
npm install
```

## Homework

Throughout your [HYF journey](https://github.com/HackYourFuture/curriculum) you will be asked to do certain homework exercises. This repository contains all of these exercises. The class repository will tell you how to hand in the homework, the curriculum will indicate what week you will need to do.

### Directory Structure

The directory structure containing the homework for a specific curriculum module, in the example below the **JavaScript** module, looks like this (Figure 1):

```
1-JavaScript/
  Week3/
    homework/
    test-reports/
    unit-tests/
  Week4/
    homework/
    test-reports/
    unit-tests/
```

Figure 1. Directory Structure for the `1-JavaScript` folder.

A similar directory structure exists for the **Browser** module (`1-Browsers`) and the **Using-APIs** module (`3-Using-APIs`).

Each `homework` folder contain sub-folders and files that make up the exercises. The exercises consist of starter files that you need to complete. Some exercises consist of a single JavaScript (for example, `ex1-giveCompliment.js`). Exercises that are browser-based are mostly contained in sub-folders (for example, `ex1-bookList/`).

You should not change anything in the `test-reports` and `unit-tests` sub-folders. The purpose of these folders will be explained further later.

As mentioned, each exercise comes with starter code. Inside the starter code you will find comments that indicate at which places there is something for you to do. Example (Figure 2):

```js
function giveCompliment(/* parameters go here */) {
  // TODO: complete this function
}

// TODO: substitute your own name for "HackYourFuture"
const myName = "HackYourFuture";

console.log(giveCompliment(myName));
console.log(giveCompliment(myName));
console.log(giveCompliment(myName));

// ! Do not change or remove the code below
module.exports = giveCompliment;
```

Figure 2. Starter code example.

In general you should only change or add code in the places indicated by the `// TODO` comments. You should not delete or rename the existing function(s) in the starter code, nor should you change the file names of the starter files. This repository comes with an automated test facility that relies on the presence of these files and functions.

> Note: All JavaScript starter files in the exercises include a `"use strict"` directive at the top. This enforces that all variables are declared (with `const` or `'let`, but avoid `var`) before they are used. This is generally considered to be "_best practice_".

### Running the exercises

While working on the exercises you can run your code in the usual way, either using the command line for node-based applications or by running it in the browser for browser-based applications. Once you are satisfied with the results it is time to use the **test runner**, as described next.

> IMPORTANT: it is not recommended to use the test-runner if your code still crashes when run directly. This will just crash the test runner too. You should at least have some running code before trying it with the test runner.

### Automated testing

The repository includes an automated test facility. It serves two purposes.

1. It allows you to test yourself whether your finished exercise meets some important requirements of the assignment. Consider this a form of _early feedback_. Your homework will also be reviewed by a mentor for more thorough feedback but that make take a while to complete.

2. It allows mentors to gain a quick insight on some key quality benchmarks, giving them a head start in the review process.

### Running a test

To run a test, type the following command from the command line:

```
npm test
```

This guides you through a series of prompts to select an exercise to test, as illustrated in Figure 3 below:

```
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

Figure 3. Running a test.

The message _You have not yet worked on this exercise_ indicates that this exercise is still unmodified from its original.

**\*\*Unit Test Error Report\*\***

Unit tests are software tests that determine whether a particular part of your code produces an expected result. If is it does, it is said to _pass_ the test. If it doesn't, the failing test will be reported in the console.

In the example of Figure 3 there are three such failing unit tests. The messages are hopefully sufficient for you to correct the error(s).

Once you have corrected the error(s), rerun the test to try again.

**\*\*ESLint Report\*\***

These are not programming errors but _coding style_ errors. For instance, the unmodified exercise `ex3-tellFortune.js` produces this ESLint error:

```
C:\Users\jimcr\dev\hackyourfuture\homework\1-Javascript\Week3\homework\ex3-tellFortune.js
  46:10  error  'selectRandomly' is defined but never used  no-unused-vars
```

Style errors do not prevent your code from running correctly. However, leaving them in is simply a bad practice and is a recipe for trouble when in the future other developers try to understand and maintain your code.

**\*\*Spell Checker Report\*\***

Leaving spelling errors in your code is just plain embarrassing, especially so when there are tools to check for them. Always correct spelling errors, or, if you know the spelling to be correct, add the word to the _workspace dictionary_ in VSCode so that it is not reported again.

If there are no unit-test, style and/or spelling errors then all is well and you should see:

```
All unit tests passed.
No linting errors detected.
No spelling errors detected.
```

### Test Reports

When you run a test the result are reported to the console, but also written to a report file in the `test-reports` folder. The name of the report indicates whether the test was successful or not, as shown in Table 1 below.

<!-- prettier-ignore -->
| Name | Status |
| ---- | ------ |
| **_\<exercise>_.todo.txt** | The test for this exercise have not yet been executed or has been executed on unmodified code. |
| **_\<exercise>_.pass.txt** | All unit tests passed and no linting or spelling errors were detected. |
| **_\<exercise>_.fail.txt** | Unit test errors or ESLint or spelling errors were detected. |

Table 1. Test report types

For example:

- `creditNumberValidator.todo.txt` _or_
- `creditNumberValidator.pass.txt` _or_
- `creditNumberValidator.fail.txt`

The report files are considered part of the pull request that you will make to submit your homework. They enable reviewers to get a quick overview of your progress.

In addition, a log of the test results is written to a log file in the root directory of the repository. The name of that file is **\<email>.log**, where \<email> is your email address (or **test-runner.log** if the test runner could not determine your email address).

> **IMPORTANT: You are expected to run all the tests for the current week before submitting a pull request.**
>
> You should strive to complete all tests with no errors reported, however it is okay if for some reason you were unable to fix some error. However, you _**are**_ required to run the tests, whether successful or not.

### JavaScript Homework Exercises

- [Week 3](/1-JavaScript/Week3/README.md)
- [Week 4](/1-JavaScript/Week4/README.md)

### Browsers Homework Exercises

- [Week 1](/2-Browsers/Week1/README.md)

### Using-APIs Homework Exercises

- TODO

## Information for mentors

Here you will find some documentation how to write exercises and unit tests.

- [Test Automation](/test-automation/README.md)
