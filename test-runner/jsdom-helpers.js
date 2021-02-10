const jsdom = require('jsdom');
const fs = require('fs').promises;
const util = require('util');
const _copy = require('recursive-copy');
const _rimraf = require('rimraf');
const { HtmlValidate } = require('html-validate');
const { getFormatter } = require('html-validate/dist/cli/formatter');
const htmlValidateOptions = require('../.htmlvalidate.json');
const stylish = getFormatter('stylish');

const copy = util.promisify(_copy);
const rimraf = util.promisify(_rimraf);
const { JSDOM } = jsdom;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function copyFiles(exercisesDir) {
  try {
    await fs.mkdir('./temp');
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  return copy(exercisesDir, './temp', { overwrite: true });
}

function deleteFiles() {
  return rimraf('./temp');
}

async function prepare() {
  const homeworkFolder = process.env.HOMEWORK_FOLDER || 'homework';

  const { testPath } = expect.getState();
  const exercisePath = testPath
    .replace('unit-tests', homeworkFolder)
    .replace(/\.test\.js$/, '');
  await copyFiles(exercisePath);
  const { window } = await JSDOM.fromFile('./temp/index.html', {
    runScripts: 'dangerously',
    resources: 'usable',
  });
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
  deleteFiles,
  validateHTML,
};
