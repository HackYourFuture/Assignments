class MyCustomReporter {
  onRunComplete(contexts, results) {
    let report = "";

    results.testResults.forEach(async ({ testResults }) => {
      report += testResults
        .filter((testResult) => testResult.status === "failed")
        .map(({ fullName, failureDetails }) => {
          const details = failureDetails.map(({ error }) => {
            if (error.code || !error.matcherResult) {
              throw error;
            }

            const { expected, actual } = error.matcherResult;

            if (expected === "" && typeof actual === "string") {
              const text = actual.startsWith("\n") ? actual : "\n" + actual;
              return text.replace(/\n/g, "\n  ");
            }

            if (typeof expected === "string") {
              return `\n  Expected: ${expected}\n  Received: ${actual}`;
            }

            return "";
          });

          return `- ${fullName}${details}`;
        })
        .join("\n");
    });

    if (report !== "") {
      console.log(report);
    }
  }
}

module.exports = MyCustomReporter;
