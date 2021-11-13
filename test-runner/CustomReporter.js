const chalk = require('chalk');
class MyCustomReporter {
  onRunComplete(contexts, results) {
    let report = '';

    results.testResults.forEach(({ testResults }) => {
      report += testResults
        .filter((testResult) => testResult.status === 'failed')
        .map(({ fullName, failureDetails }) => {
          const details = failureDetails.map(({ matcherResult }) => {
            if (!matcherResult) {
              return;
            }
            const { actual, expected, pass } = matcherResult;
            if (pass) {
              return;
            }

            // Exception 1: if `expected` is an empty string and `actual` is also
            // a string we add the `actual` string to the report, adding some
            // indentation.
            if (expected === '' && typeof actual === 'string') {
              const text = actual.startsWith('\n') ? actual : '\n' + actual;
              return text.replace(/\n/g, '\n  ');
            }

            // Exception 2: if `expected` is a string we add `expected` and `actual`
            // to the report.
            if (typeof expected === 'string') {
              return `\n  Expected: ${expected}\n  Received: ${actual}`;
            }

            // In all other cases we do not add actual an expected to the report
            // to keep it simple and clean.
            return '';
          });

          // The full name (i.e. title) of a failing test is always reported.
          return `${chalk.red('✕')} ${chalk.red(fullName)}${chalk.gray(
            details
          )}`;
        })
        .join('\n');
    });

    if (report !== '') {
      console.log(report);
    }
  }
}

module.exports = MyCustomReporter;
