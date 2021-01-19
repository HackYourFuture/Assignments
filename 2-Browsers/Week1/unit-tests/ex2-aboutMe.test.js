const {
  prepare,
  validateHTML,
  deleteFiles,
} = require("../../../test-automation/puppeteer-helpers");

describe("Generated HTML", () => {
  beforeAll(async () => {
    await prepare(page);
  });

  afterAll(() => {
    deleteFiles();
  });

  it("should be syntactically valid", validateHTML);
});
