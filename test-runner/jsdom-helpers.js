const path = require('path');
const jsdom = require('jsdom');
const { HtmlValidate } = require('html-validate');
const { getFormatter } = require('html-validate/dist/cli/formatter');
const htmlValidateOptions = require('../.htmlvalidate.json');
const stylish = getFormatter('stylish');

const { JSDOM } = jsdom;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function prepare() {
  const homeworkFolder = process.env.HOMEWORK_FOLDER || 'homework';

  const { testPath } = expect.getState();
  const exercisePath = testPath
    .replace('unit-tests', homeworkFolder)
    .replace(/\.test\.js$/, '');

  const { window } = await JSDOM.fromFile(
    path.join(exercisePath, 'index.html'),
    {
      runScripts: 'dangerously',
      resources: 'usable',
    }
  );

  window.fetch = require('node-fetch');
  await sleep(500);
  return window;
}

const htmlValidate = new HtmlValidate(htmlValidateOptions);

async function validateHTML(outerHTML) {
  const htmlText = `<!DOCTYPE html>\n${outerHTML}`;
  const report = htmlValidate.validateString(htmlText);
  const validationReport = stylish(report);
  expect(validationReport).toBe('');
}

module.exports = {
  prepare,
  validateHTML,
};
