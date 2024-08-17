#!/usr/bin/env bash

module_week="$(node ./.dist/test-runner/module-week.js)"

if [ "$module_week" == "none" ]; then
  echo "No exercises were modified this week"
  exit 1
fi

if [ "$module_week" == "multiple" ]; then
  echo "This branch contains changes for multiple weeks"
  exit 1
fi

echo "Running tests for $module_week..."

if [ "$module_week" == "1-JavaScript/Week3" ]; then
  npx jest "./1-JavaScript/Week3" --ci --reporters=jest-junit
else
  npx jest "./.dist/$module_week" --ci --reporters=jest-junit
fi

jest_exit_code=$?

echo
if [ $jest_exit_code -eq 0 ]; then
  echo "Tests passed successfully"
else
  echo "One or more tests failed"
fi

exit $jest_exit_code