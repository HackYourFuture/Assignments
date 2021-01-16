class MyCustomReporter {
  onRunComplete(contexts, results) {
    let report = "";
    results.testResults.forEach(async ({ testResults }) => {
      const failedTestResults = testResults.filter(
        (testResult) => testResult.status === "failed"
      );

      if (failedTestResults.length !== 0) {
        report += failedTestResults
          .map(({ fullName, failureDetails }) => {
            let message = `- ${fullName}`;
            // Extra custom error messages can be passed by expecting an empty
            // string and passing the messages as the actual value in a
            // unit test, e.g.:
            // expect(messages).toBe('')
            message += failureDetails.map(({ error }) => {
              if (error.code) {
                throw error;
              }
              return error.matcherResult.expected === ""
                ? error.matcherResult.actual.replace(/\n/g, "\n  ")
                : "";
            });
            return message;
          })
          .join("\n");
      }
    });
    console.log(report);
  }
}

module.exports = MyCustomReporter;
