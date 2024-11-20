# Assignments

This repository contains all of the assignments exercises that need to be handed in for the JavaScript modules (i.e., JavaScript, Browsers and UsingAPIs) of the HackYourFuture curriculum.

## TL;DR

We highly recommend that you go through this README in detail before starting to work on the assignments. Having said that, the essentials can be summarized as follows:

> Important: If you are using a Windows-based computer, please type this command from a Windows Terminal window before you proceed:
>
> `git config --global core.autocrlf false`
>
> This will ensure that the line endings for text files are compatible with those used on MacOS and Linux-based computers.

1. Fork the `HackYourAssignment/Assignments-CohortXX` repository to your own GitHub account.
2. Clone the fork to your local computer.
3. Open the root folder of the repository in VSCode.
4. When invited to do so, please install the recommended VSCode extensions.
5. Run the command `npm install` from the root folder of the repository.
6. Make sure that you are on the `main` branch (if not, check it out first).
7. Create a new branch and name it (e.g., for week 2 of JavaScript) `YOUR_NAME-w2-JavaScript`. Replace `YOUR_NAME` with your name. Note that you should not work on / modify the `main` branch.
8. Start your work on the assignments for week 2.
9. After finishing an assignment, use the command `npm test` to test your solution.
10. Fix any reported issues and rerun the test. Repeat until all issues are fixed.
11. When all assignments are done, commit all changed files. This includes the modified exercises, the generated test summary (`TEST_SUMMARY.md`) and test reports (`EXERCISE_NAME.report.txt`).
12. Push the changes to your fork.
13. Create a pull request against the `main` branch of the `HackYourAssignment/Assignments-CohortXX` repository. For the title of your pull request use the same format as the branch name, e.g.: `YOUR_NAME-w2-JavaScript`.

Repeat steps 6-13 for each week. For subsequent weeks the mandated branch names are:

- `YOUR_NAME-w3-JavaScript`
- `YOUR_NAME-w1-Browsers`
- `YOUR_NAME-w1-UsingAPIs`
- `YOUR_NAME-w2-UsingAPIs`

For more information how to hand in your weekly assignments please refer to the [Hand-in Assignments Guide](https://github.com/HackYourFuture/JavaScript/blob/main/hand-in-assignments-guide.md#12-every-week).

## Introduction

Throughout your [HYF journey](https://github.com/HackYourFuture/curriculum) you will be asked to do certain exercises. This repository contains all of these exercises for the JavaScript modules (JavaScript, Browsers, UsingAPIs). The module repositories will tell you how to hand in the assignment, the curriculum will indicate what week you will need to do.

> Note that a fork of this repository will be created on the [HackYourAssignment](https://github.com/HackYourAssignment) GitHub account specifically for your cohort. The name of the repository will have the format `Assignments-cohortXX` where `XX` is your cohort number,

## Installation

After forking and subsequently cloning your forked repository execute the following command from the command line to complete the installation:

```text
npm install
```

This command:

- Installs required software dependencies from the Internet.
- Sets up folders and files used to track your progress.

## VSCode

You will be spending a lot of time in [VSCode](https://code.visualstudio.com/) while working with this repository. If you are new to VSCode please check out the [VSCode Tips](https://github.com/HackYourFuture/fundamentals/blob/master/VSCodeTips/README.md) before continuing.

From the command line, while inside the `Assignments-cohortXX` folder, you can use this command to open VSCode (the `.` stands for the current directory):

```text
code .
```

> When working on your assignments it is strongly recommended to always open the `Assignments-cohortXX` folder in VSCode rather than one of its sub-folders. This gives VSCode and all its extensions the full view on the repository for the best overall developer experience.
>
> Note that the name of the folder opened in VSCode can always be found in the `EXPLORER` panel ( `ASSIGNMENTS_COHORT49` in the picture below):
>
> ![folder-name](./assets/folder-name.png)

### Install Recommended VSCode Extensions

**Important**: When you open the repository for the first time you may see the dialog box shown below that invites you to install a set of **recommended VSCode extensions**. These extensions will provide useful help and guidance when you are creating and editing files in VSCode. **Please install these extensions when invited to do so.**

![recommended-extensions](./assets/recommended-extensions.png)

If, for some reason, the prompt to install the extensions does not appear then please install the extensions manually (click on the triangle below for details).

<details>
  <summary>Manual installation</summary>

<br>If for some reason you do not see the VSCode message box inviting you to install the recommended extensions you can do so manually by clicking the **Extensions** button in the VSCode sidebar, pressing the **Filter** button and then selecting **Recommended** from the drop-down menu as shown in the figure below. Please install all extensions listed under the **Workspace Recommendations** header.

![VSCode Recommended Extensions](./assets/vscode-recommended-extensions.png)

</details>

### Overview of the Directory Structure

The directory structure containing the assignment for a specific curriculum module (in Figure 1 below, the **JavaScript** module), looks like this:

![directory structure](./assets/directory-structure.png)
<br>Figure 1. Directory Structure for the `1-JavaScript` folder.

> A similar directory structure exists for the **Browser** module (`2-Browsers`) and the **UsingAPIs** module (`3-UsingAPIs`).

Each `assignment` folder contains files and (sometimes) sub-folders that make up the exercises. The exercises consist of starter files that you need to complete. Some exercises consist of a single JavaScript (for example, `ex1-giveCompliment.js`). Exercises that are browser-based are mostly contained in sub-folders (for example, `ex1-bookList` in the `1-Browsers/assignment` folder).

> You should not change anything in the `unit-tests` sub-folder. The purpose of this folder will be explained later.

As mentioned, each exercise comes with starter code. Inside the starter code you will find comments that indicate the places where there is something for you to do. For example, in the code of the JavaScript file `ex1-giveCompliment.js` as shown in Figure 2 this is:

1. The **parameter list** (if needed, for you to figure out) of the function `giveCompliment`.
2. The **function body** of `giveCompliment`.
3. The **value** of the variable `myName`.

```js
export function giveCompliment(/* TODO parameter(s) go here */) {
  // TODO complete this function
}

function main() {
  // TODO substitute your own name for "HackYourFuture"
  const myName = 'HackYourFuture';

  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));

  const yourName = 'Amsterdam';

  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
```

Figure 2. Starter code example: file `ex1-giveCompliment.js`.

In general, you should only change or add code in the places indicated by the `// TODO` comments. Once you have implemented what the `// TODO` comment asks you to do, remove the `// TODO` comment itself.

You should not delete or rename existing function(s), nor should you change the file names of the starter files. This repository comes with an automated test facility that relies on the presence of these files and functions.

You _are_ allowed to add additional functions and/or global variables (but avoid global variables if you can).

When you are in the process of making changes to a file you will notice a dot or bullet appearing after the file name in the tab of the editor window, as shown in Figure 4 below:

![Unsaved Changes](./assets/unsaved-changes.png)
<br>Figure 3. Unsaved changes

This indicates that you have unsaved changes. Once you are done, you can use the **File**, **Save** menu commands (or a keyboard shortcut) to save the changes. However, in this repository we have included a setting that automatically saves changes for you whenever you click away from the editor window.

> If you are curious about the VSCode settings that we included in this repository, check the file `settings.json` in the `.vscode` folder. The setting we mentioned in the previous paragraph is: **"files.autoSave": "onFocusChange"**.
>
> You can learn more about VSCode settings here: [User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings).

### Prettier VSCode Extension

This is a recommended VSCode extension that we have included in this repository. **Prettier** is an automatic code formatter to make your code look "pretty". However, it is not just that your code is made pretty, it formats your code into a popular standard that has become well established in the JavaScript community. Other developers, whether trainees, mentors or, later, your colleagues will thank you for using it.

> Ensure that you do not install any other code formatter extensions, for example, **Beautify**, in addition to Prettier. This may cause formatting conflicts.

### ESLint VSCode Extension

Another recommended extension is we have included is **ESLint**. This tool will check your code for _coding style_ errors. Style errors will not necessarily prevent your code from running correctly. However, they indicate that your code does not conform to a preferred coding style. For instance, if you define a variable using the `let` keyword and you do not reassign that variable elsewhere in your code then ESLint will warn you to replace `let` with `const`. In Figure 4 below you can see that the variable name `myName` has a squiggly colored underline. If you hover your mouse over the variable a pop-up window will appear.

![ESLint warnings](./assets/eslint-warning.png)
<br>Figure 4. ESLint warnings

You can also inspect the **Problems** pane or the left hand size of the VSCode status bar to see whether any problems have been detected, as shown in Figure 5.

![Problems](./assets/problems.png)
<br>Figure 5. VSCode Problems Pane

### Code Spell Checker

A further extension that we have included is a spell checker that understands code. It particularly understands that variable, property and function names are often multi-word names that use **camelCase**, **PascalCase**, **snake_case** or **kebab-case**. When it checks for spelling errors it knows how to break up these multi-word names before checking the broken down words against its dictionary. Spelling mistakes are indicated by squiggly underlines and also reported in the Problems pane.

> Take pride in the correct spelling in your code. It is a sign of professionalism!

## Running the exercises

While working on the exercises you can test-run your code in the usual way, either using the command line (for node-based programs) or by running it in the browser (for browser-based applications). As mentioned earlier, in the **JavaScript** module you will be working with Node-based programs.

To run the exercise while in VSCode, first open a VSCode **Integrated Terminal**. You can do so from the VSCode menu, by selecting the **Terminal**, **New Terminal** menu commands, or by using the keyboard shortcut as listed in that menu.

> Tip: for an overview of the keyboard shortcuts available in VSCode, select the **Help**, **Keyboard Shortcut Reference** menu commands. This will open a PDF file in the standard browser, listing all available shortcuts.

The most convenient way to run an exercise from the command line is to use the **exercise runner** included in this repository. Type the following command to run an exercise this way:

```text
npm start
```

This will lead you through a series of prompts, similar to as shown below, to select the exercise to run:

```text
? Which module? 1-Javascript
? Which week? Week3
? Which exercise? ex1-giveCompliment
Running exercise, please wait...
You are exciting, HackYourFuture!
You are marvelous, HackYourFuture!
You are awesome, HackYourFuture!
```

For Node-based programs the console output will be shown in the terminal window. For browser-based application an HTTP server will be started and your web page will opened in the default web browser.

Alternatively you may choose to run the exercise manually. The easiest way for a Node-based program is to open a new terminal window directly in the folder that contains your exercise, to right-click its name in the File Explorer pane and select the **Open in Integrated Terminal** option from the context menu, as shown in Figure 6 below.

![Open in Integrated Terminal](./assets/open-in-terminal.png)
<br>Figure 6. Open in Integrated Terminal

This will open a terminal window at the bottom of the screen, as show in Figure 7 below (using **PowerShell** in Windows or **bash** or **zsh** in MacOS or Linux):

![Terminal Window](./assets/terminal-window.png)
<br>Figure 7. Terminal Window

Because we used the context menu in the VSCode File Explorer, the current directory in the terminal window is already the `assignment` folder containing the exercise. We can execute our program (in this example `ex1-giveCompliment.js`) by typing `node`, followed by a space and then enough characters to uniquely identify the file. Then press the **Tab** key to _expand_ the file name. Because the names of all exercises start with `ex𝑛`, where 𝑛 is a number, it is enough to type just that and press the **Tab** key:

```text
node ex1- (press TAB)
```

This will run the code and any `console.log` statement will print in the terminal window. The unmodified code example will just print:

```text
❯ node .\ex1-giveCompliment.js
undefined
undefined
undefined
```

It is now up to you to complete the code so that it, perhaps, produces something like:

```text
❯ node .\ex1-giveCompliment.js
You are lovely, HackYourFuture!
You are great, HackYourFuture!
You are awesome, HackYourFuture!
```

Once you are satisfied with the results it is time to use the **test runner**, as described next.

> IMPORTANT: it is not recommended to use the test-runner if your code still crashes when run directly. This will just crash the test runner too. You should at least have some running code before trying it with the test runner.

### Automated testing

The repository includes an automated test facility. It serves two purposes.

1. It allows you to test yourself whether your finished exercise meets some important requirements of the assignment. Consider this a form of _early feedback_. Your assignment will also be reviewed by a mentor for more thorough feedback later but that make take a while to complete.

2. It allows mentors to gain a quick insight on some key quality benchmarks, giving them a head start in the review process.

> The tests that we have provided here cannot possibly test conformance to every detail of the exercise assignments. Therefore running a successful test is just a first indication of success. Ultimately, it will be the mentor reviewing your assignment to give the final verdict.

### Running a test

Each time you have made changes to an exercise you need to test your changes.

To run a test, type the following command from the command line:

```text
npm test
```

The test runner examines the exercise files in your repository and if it finds one or more modified exercises it will prompt you whether you want to test the first one. For example:

```text
? Test modified exercise (1-JavaScript, Week2, ex1-giveCompliment)? (Y/n)
```

If that is what you want, accept the default by just pressing <kbd>Enter</kbd> to run the test. Otherwise enter `n` and press <kbd>Enter</kbd> to let the test runner present you a menu from which to select an exercise to test.

```text
? Which module? 1-JavaScript
? Which week? Week2
? Which exercise? ex1-giveCompliment
```

Once an exercise has been selected the test runner will execute the test, as illustrated in the example of Figure 8 below:

```text
Running test, please wait...

*** Unit Test Error Report ***

Command failed: npx jest H:/dev/hackyourfuture/Assignments/.dist/1-JavaScript/Week2/unit-tests/ex1-giveCompliment.test.js --colors --noStackTrace --json
 FAIL  .dist/1-JavaScript/Week2/unit-tests/ex1-giveCompliment.test.js
  js-wk2-ex1-giveCompliment
    ✅ should exist and be executable (2 ms)
    ❌ should have all TODO comments removed (1 ms)
    ✅ `giveCompliment` should not contain unneeded console.log calls
    ❌ should take a single parameter (1 ms)
    ✅ should include a `compliments` array inside its function body
    ❌ the `compliments` array should be initialized with 10 strings (1 ms)
    ❌ should give a random compliment: You are `compliment`, `name`! (2 ms)

  ● js-wk2-ex1-giveCompliment › should have all TODO comments removed

    expect(received).toBeFalsy()

    Received: true

  ● js-wk2-ex1-giveCompliment › should take a single parameter

    expect(received).toHaveLength(expected)

    Expected length:   1
    Received length:   0
    Received function: [Function giveCompliment]

  ● js-wk2-ex1-giveCompliment › the `compliments` array should be initialized with 10 strings

    expect(received).toHaveLength(expected)

    Expected length: 10
    Received length: 0
    Received array:  []

  ● js-wk2-ex1-giveCompliment › should give a random compliment: You are `compliment`, `name`!

    expect(received).toBe(expected) // Object.is equality

    Expected: ""
    Received: "compliment is not randomly selected"

Test Suites: 1 failed, 1 total
Tests:       4 failed, 3 passed, 7 total
Snapshots:   0 total
Time:        1.582 s
Ran all test suites matching /H:\\dev\\hackyourfuture\\Assignments\\.dist\\1-JavaScript\\Week2\\unit-tests\\ex1-giveCompliment.test.js/i.
No linting errors detected.
No spelling errors detected.
```

Figure 8. Running a test.

#### Unit Test Error Report

Unit tests are software tests that determine whether a particular part of your code produces an expected result. If is it does, it is said to _pass_ the test. If it doesn't, the failing test will be reported in the console.

In Figure 8 the test results are shown for the still unmodified version of `ex1-giveCompliment`. There are 4 such failing unit tests (marked with `x`). The messages are hopefully sufficiently informative for you to correct the error(s).

Once you have corrected the error(s), rerun the test to try again.

#### ESLint Report

These are not programming errors but _coding style_ errors. For instance, the unmodified exercise `ex3-tellFortune.js` produces this ESLint error:

```text
ex3-tellFortune.js
  46:10  error  'selectRandomly' is defined but never used  no-unused-vars
```

In this example the error message indicates that a style error was detect in line 46, column 10 of the file `ex3-tellFortune.js`. The variable (or function) `selectRandomly` was defined but never used.

Style errors do not prevent your code from running correctly. However, leaving them in is simply a bad practice and is a recipe for trouble in the future when other developers attempt to understand and maintain your code.

#### Spell Checker Report

Leaving spelling errors in your code is just plain embarrassing, especially so when there are tools to check for them. Always correct spelling errors, or, if you know the spelling to be correct, add the word to the _workspace dictionary_ in VSCode so that it is not reported again.

If there are no unit-test, style and/or spelling errors then all is well and you should see:

```text
All unit tests passed.
No linting errors detected.
No spelling errors detected.
```

### Test Reports

When you run a test the results are reported to the console, but also written to a report file in the `test-reports` folder for the assignments of current week and a test summary in the `.test-results` folder.

You should include the test report files in the pull request that you will make to submit your assignments. This will enable reviewers to get a quick overview of your progress, without the need to run the tests again themselves.

> **IMPORTANT: You are expected to run all the tests for the current week before submitting a pull request.**
>
> You should strive to complete all tests with no errors reported, however it is okay if for some reason you were unable to fix some error and need your mentor to help during review. Nevertheless, you _**are**_ required to run the tests, whether successful or not.

## Assignment Exercise Instructions

### JavaScript Module

- [Week 3](/1-JavaScript/Week3/README.md)
- [Week 4](/1-JavaScript/Week4/README.md)

### Browsers Module

- [Week 1](/2-Browsers/Week1/README.md)

### UsingAPIs Module

- [Week 1](/3-UsingAPIs/Week1/README.md)
- [Week 2](/3-UsingAPIs/Week2/README.md)

## Information for mentors

More information about the review process:

- [Review Guide](https://github.com/HackYourFuture/mentors/blob/main/assignment-support/review-guide.md)

Here you will find some documentation how to write exercises and unit tests.

- [Test Runner](/test-runner/README.md)

## Copyright

_The HackYourFuture curriculum is subject to CC BY copyright. This means you can freely use our materials, but just make sure to give us credit for it_ :).

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
