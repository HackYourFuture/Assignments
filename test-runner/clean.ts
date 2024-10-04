import 'dotenv/config.js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import { rimrafSync } from 'rimraf';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  if (process.env.ENABLE_CLEAN !== '1') {
    console.log(
      chalk.yellow(
        'This script is meant to be run in a development environment. If you are sure you want to run it locally, set ENABLE_CLEAN=true in your .env file.'
      )
    );
    process.exit(1);
  }

  console.log('Cleaning up junit.xml...');
  rimrafSync(path.join(__dirname, '../../junit.xml'));

  console.log('Cleaning up test results...');
  rimrafSync(path.join(__dirname, '../../.test-summary').replace(/\\/g, '/'));
  rimrafSync(
    path.join(__dirname, '../../**/test-reports').replace(/\\/g, '/'),
    {
      glob: true,
    }
  );
} catch (err: any) {
  console.error(chalk.red(`Something went wrong: ${err.message}`));
  throw err;
}
