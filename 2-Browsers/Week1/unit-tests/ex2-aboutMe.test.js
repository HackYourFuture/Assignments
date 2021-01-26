const {
  prepare,
  validateHTML,
  deleteFiles,
} = require('../../../test-runner/puppeteer-helpers');

describe('Generated HTML', () => {
  beforeAll(async () => {
    await prepare(page);
  });

  afterAll(() => {
    deleteFiles();
  });

  it('should be syntactically valid', validateHTML);
});
