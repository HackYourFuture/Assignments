#!/bin/bash

module_week="$(node ./.dist/test-runner/module-week.js)"

json_file="test-report.json"

if [ "$module_week" == "none" ]; then
  echo "{\"__error__\": \"No exercises were modified this week.\"}" > $json_file
  exit 1
fi

if [ "$module_week" == "multiple" ]; then
  echo "{\"__error__\": \"This branch contains changes for multiple weeks.\"}" > $json_file
  exit 1
fi


# Unit tests for 1-JavaScript/Week3 are written by students in JavaScript.
# In contrast, the remaining unit tests are written in TypeScript and transpiled 
# to the .dist folder.
if [ "$module_week" == "1-JavaScript/Week3" ]; then
  npx jest "./$module_week" --no-color --json --outputFile=$json_file
else
  npx jest "./.dist/$module_week" --no-color --json  --outputFile=$json_file
fi

jest_exit_code=$?


exit $jest_exit_code