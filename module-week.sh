#!/bin/bash
#
# This script is used by GitHub Actions to run tests for the exercises modified.
# The script determines the week based on the modified exercises and runs the 
# tests for that week. If no exercises were modified or exercises for multiple
# weeks were modified, the script exits early with an error.

module_week="$(node ./.dist/test-runner/module-week.js)"

if [[ "${module_week}" == none ]]; then
  echo "No exercises were modified this week."
  exit 1
fi

if [[ "${module_week}" == multiple ]]; then
  echo "This branch contains changes for multiple weeks."
  exit 1
fi

echo "Running tests for ${module_week}..."

# Unit tests for 1-JavaScript/Week3 are written by students in JavaScript.
# In contrast, the remaining unit tests are written in TypeScript and transpiled 
# to the .dist folder.
if [[ "${module_week}" == 1-JavaScript/Week3 ]]; then
  npx jest "./${module_week}" --ci --reporters=jest-junit
else
  npx jest "./.dist/${module_week}" --ci --reporters=jest-junit
fi

jest_exit_code=$?

echo
if [[ ${jest_exit_code} -eq 0 ]]; then
  echo "Tests passed successfully."
else
  echo "One or more tests failed."
fi

exit $jest_exit_code