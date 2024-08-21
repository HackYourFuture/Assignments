import * as core from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import * as core from './fake-action-core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const reportJsonFile = path.join(__dirname, '../../test-report.json');
  const reportJson = fs.readFileSync(reportJsonFile, 'utf8');
  const data = JSON.parse(reportJson);

  const summary = core.summary;

  if ('__error__' in data) {
    await summary
      .addHeading('No Test Results Available', '1')
      .addRaw(data['__error__'], true)
      .write();
    process.exit(1);
  }

  const testResults = data.testResults.sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );

  let prevModule = '';
  let prevWeek = '';

  for (const testResult of testResults) {
    const regex = /[\\/](\d-\w+)[\\/](Week\d)[\\/]/g;
    const match = regex.exec(testResult.name);
    if (!match) {
      continue;
    }

    const [, module, week] = match;
    const exercise = path.basename(testResult.name, '.js');

    if (module !== prevModule) {
      summary.addHeading(module, '1');
      prevModule = module;
    }

    if (week !== prevWeek) {
      summary.addHeading(week, '2');
      prevWeek = week;
    }

    summary.addHeading(`${exercise}`, '3');
    const list: string[] = [];
    for (const result of testResult.assertionResults) {
      const symbol = result.status === 'passed' ? '✅' : '❌';
      list.push(`${symbol} ${result.title}`);
    }
    summary.addList(list);

    await summary.write();
  }
}

main();
