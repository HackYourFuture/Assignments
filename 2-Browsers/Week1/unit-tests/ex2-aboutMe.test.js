const {
  prepare,
  validateHTML,
  deleteFiles,
} = require('../../../test-runner/jsdom-helpers');

describe('Generated HTML', () => {
  const state = {};

  beforeAll(async () => {
    const { document } = await prepare();
    state.outerHTML = document.documentElement.outerHTML;
  });

  afterAll(() => {
    deleteFiles();
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));
});
