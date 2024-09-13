# Assignments Changelog

## 2021-02-01, Version 1.0

First used by class32.

## 2024-09-01, Version 1.1

- Test runner rewritten in TypeScript.
- Unit tests rewritten in TypeScript (except the unit tests that are part of an exercise to be coded by trainees, those remain in JavaScript).
- Where applicable, exercises now use `import`/`export` instead of `require()`, but are otherwise unchanged.
- The test runner keeps track of which exercises have been modified and which exercises have been tested after modification. This is done by computing and comparing hashes based on exercise file content.
- Added a Git pre-commit hook to disallow changes to the `main` branch and to enforce the format of the week-branch name. Example: YourName-w1-JavaScript. As a new branch should be created for each week the pre-commit hook also disallows committing changes that are for more than one week.
- Added a Git pre-push hook that disallows pushing changed exercises that have not been tested or need retesting after modification.
- Replaced the per-exercise test reports with a single test report that appears as the first changed file in a PR, for easy reference by homework reviewers.
- ~~Added GitHub actions that run Jest unit tests on the exercises in the PR and that creates a test report in the GitHub PR details.~~ To be reviewed at a later date.
