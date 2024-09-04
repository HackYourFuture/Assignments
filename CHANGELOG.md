# Assignments Changelog

## 2021-02-01, Version 1.0

First used by class32

## 2024-09-01, Version 1.1

- Test runner rewritten in TypeScript.
- Unit tests rewritten in TypeScript (except the unit tests that are part of an exercise to be coded by trainees, those remain in JavaScript).
- The test runner keeps track of which exercises have been modified and which exercises have been tested after modification. This is done by computing and comparing hashes based on exercise file content.
- Added a pre-commit Git hook to disallow changes to the `main` branch and to enforce the format of the week branch name. Example: JohnDoe-w1-JavaScript. The pre-commit hook also disallow committing changes that span weeks.
- Added a pre-push hook that disallows pushing changed exercises that have not been tested or that need retesting.
- Replaced the per-exercise test reports by a single test report that appears as the first changed file in a PR, for easy reference by homework reviewers.
- Added GitHub actions that run Jest unit tests on the exercises in the PR and that creates a test report in the PR summary.
