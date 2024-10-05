import { stylish } from '@html-validate/stylish';
import { HtmlValidate } from 'html-validate';
import jsdom from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const { JSDOM } = jsdom;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function prepare() {
  const { testPath } = expect.getState();
  if (!testPath) {
    throw new Error('testPath not found in expect.getState()');
  }

  const exercisePath = testPath
    .replace(/\\/g, '/')
    .replace('/.dist/', '/')
    .replace('unit-tests', 'assignment')
    .replace(/\.test\.[jt]s$/, '');

  const virtualConsole = new jsdom.VirtualConsole();

  const { window } = await JSDOM.fromFile(
    path.join(exercisePath, 'index.html'),
    {
      runScripts: 'dangerously',
      resources: 'usable',
      virtualConsole,
    }
  );

  await sleep(1000);
  return window;
}

export async function validateHTML(outerHTML: string) {
  const json = await fs.promises.readFile(
    path.join(__dirname, '../../.htmlvalidate.json'),
    'utf8'
  );
  const htmlValidate = new HtmlValidate(JSON.parse(json));

  const htmlText = `<!DOCTYPE html>\n${outerHTML}`;
  const { results } = await htmlValidate.validateString(htmlText);
  const cookedResults = results.map((result) => ({
    ...result,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
  }));
  const validationReport = stylish(cookedResults);
  expect(validationReport).toBe('');
}
