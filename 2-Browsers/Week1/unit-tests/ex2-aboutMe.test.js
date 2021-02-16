const { prepare, validateHTML } = require('../../../test-runner/jsdom-helpers');

describe('Generated HTML', () => {
  const state = {};

  beforeAll(async () => {
    const { document } = await prepare();
    state.outerHTML = document.documentElement.outerHTML;
  });

  it('HTML should be syntactically valid', () => validateHTML(state.outerHTML));
});
