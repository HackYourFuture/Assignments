# UNDER CONSTRUCTION.

## Installation

After forking and/or cloning this repository execute the following command from the command line to install all software prerequisites:

```
npm install
```

## Homework

Throughout your [HYF journey](https://github.com/HackYourFuture/curriculum) you will be asked to do certain homework exercises, this repository contains all of these exercises. The class repository will tell you how to hand in the homework, the curriculum will indicate what week you will need to do.

### Directory Structure

The directory structure for the homework of the **JavaScript** module looks like this (Figure 1):

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

<small>Figure 1. Directory Structure for the `1-JavaScript` folder.</small>

A similar directory structure is in place for the **Browser** module (`1-Browsers`) and the **Using-APIs** module (`3-Using-APIs`).

Each `homework` folder contain sub-folders and files that make up the exercises. Some exercises consist of a single JavaScript that needs to be completed (for example, `ex1-giveCompliment.js`). Exercises that are browser-based are mostly contained in sub-folders (for example, `ex1-bookList/`).

Do not change anything in the `test-reports` and `unit-tests` sub-folders. Their purpose will be explained further down below.

Each exercise comes with starter code. Inside the starter code that indicate where there is something for you to do. Example (Figure 2):

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

<small>Figure 2. Starter code example.</small>

In general you should only change or add code in the places indicated by the `// TODO` comments. Do not delete or rename the existing function(s) in the starter code. This repository comes with an automated test facility that relies on the presence of these functions.

### Running the exercises

You can run your code using the command line for node-based applications or by running it in the browser for browser-based applications. Once you are satisfied with the results it is time to use the **test-runner**, as described next.

### Automated testing

The repository includes an automated test facility. It serves two purposes.

1. It allows you to test yourself whether your completed exercise meets important requirements of the assignment. Consider this a form of _early feedback_. Your homework will also be reviewed by a mentor for a more thorough analysis but that may take several days or perhaps one or two weeks to complete.

2. It allows mentors to gain a quick insight on some key quality benchmarks, giving them a head start in the review process.

### Running a test

To run a test, type the following command from the command line:

```
npm test
```

This takes you through a series of prompts to select an exercise to test, as illustrated in Figure 3 below:

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

<small>Figure 3. Running a test.</small>

The message _You have not yet worked on this exercise_ indicates that this exercise is still unmodified from its original.

**Unit Test Error Report**

Unit tests are software tests that determine whether a particular part of your code produces an expected result. If is it does, is it said to _pass_ the test. If it doesn't, the failing test will be reported in the console.

In the example of Figure 3 there are three such failing unit tests. The messages are intended to be sufficient for you to correct the error.

Once you have corrected the error(s), rerun the test to try again.

**ESLint Report**

These are not programming errors but _coding style_ errors. For instance, the unmodified exercise `ex3-tellFortune.js` produces this ESLint error:

```
C:\Users\jimcr\dev\hackyourfuture\homework\1-Javascript\Week3\homework\ex3-tellFortune.js
  46:10  error  'selectRandomly' is defined but never used  no-unused-vars
```

Style errors do not prevent your code from running correctly. However, leaving them in is simply a bad practice and may lead to trouble ahead for other developers looking at your code that unfamiliar with your thinking.

**Spell Checker Report**

Leaving spelling errors in your code is just embarrassing, especially so if there are tools to check for them.

### Test Reports

When you run a test the result are reported to the console, but, in addition, are also written to a report file in the `test-reports` folder. The name of the report indicates whether the test was successful or not, as shown in Table 1 below.

<!-- prettier-ignore -->
| Name | Status |
| ---- | ------ |
| **_\<exercise>_.todo.txt** | The tests for this exercise have not yet been executed or has been executed on unmodified code. |
| **_\<exercise>_.pass.txt** | All unit tests passed and no linting errors were detected. |
| **_\<exercise>_.fail.txt** | Unit test errors or linting errors have been detected. |

<small>Table 1. Test report types</small>

For example:

- `creditNumberValidator.todo.txt` _or_
- `creditNumberValidator.pass.txt` _or_
- `creditNumberValidator.fail.txt`

These report files are part of the pull request that you will make to submit your homework. They enable reviewer to get a quick overview of your progress.

Furthermore, a log of the test results is written to a log file in the root directory of this repository. The name of that file is **\<email>.log**, where \<email> is your email address (or **test-runner.log** if the test runner could not determine your email address).

> **IMPORTANT: You are expected to run all the tests for the current week before submitting a pull request.**

### JavaScript Homework Exercises

- [Week 3](/1-JavaScript/Week3/README.md)
- [Week 4](/1-JavaScript/Week4/README.md)

### Browsers Homework Exercises

- [Week 1](/2-Browsers/Week1/README.md)

### Using-APIs Homework Exercises

- TODO

## Information for mentors

Here you will find some documentation how to write exercises and unit tests"

- [Test Automation](/test-automation/README.md)
