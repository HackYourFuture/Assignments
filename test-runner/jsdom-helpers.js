const path = require('path');
const jsdom = require('jsdom');
const { HtmlValidate } = require('html-validate');
// const { getFormatter } = require('html-validate/dist/cli/formatter');
const htmlValidateOptions = require('../.htmlvalidate.json');
const stylish = require('@html-validate/stylish');

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

  const virtualConsole = new jsdom.VirtualConsole();

  const { window } = await JSDOM.fromFile(
    path.join(exercisePath, 'index.html'),
    {
      runScripts: 'dangerously',
      resources: 'usable',
      virtualConsole,
    }
  );

  window.fetch = require('node-fetch');
  await sleep(1000);
  return window;
}

const htmlValidate = new HtmlValidate(htmlValidateOptions);

async function validateHTML(outerHTML) {
  const htmlText = `<!DOCTYPE html>\n${outerHTML}`;
  const { results } = htmlValidate.validateString(htmlText);
  const validationReport = stylish(results);
  expect(validationReport).toBe('');
}

module.exports = {
  prepare,
  validateHTML,
};
