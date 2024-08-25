import 'dotenv/config.js';

import chalk from 'chalk';
import path from 'node:path';
import { rimrafSync } from 'rimraf';
import { fileURLToPath } from 'url';
import { createExerciseHashes } from './compliance-helpers.js';
import ExerciseMenu, { MenuData } from './ExerciseMenu.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function removeReportFolders(menuData: MenuData) {
  for (const module of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[module]);

    for (const week of weeks) {
      const dirPath = path.join(
        __dirname,
        `../../${module}/${week}/test-reports`
      );
      rimrafSync(dirPath);
    }
  }
}

try {
  if (process.env.ENABLE_CLEAN === 'true') {
    console.log(
      chalk.yellow(
        'This script is meant to be run in a development environment. If you are sure you want to run it locally, set ENABLE_CLEAN=true in your .env file.'
      )
    );
    process.exit(1);
  }

  const { menuData } = new ExerciseMenu();

  console.log('Computing and saving exercise hashes...');
  createExerciseHashes(menuData);

  // console.log('Clearing out report folders...');
  // await removeReportFolders(menuData);

  // console.log('Cleaning up test-runner.log file...');
  // rimrafSync(path.join(__dirname, '../../test-runner.log'));

  console.log('Cleaning up junit.xml...');
  rimrafSync(path.join(__dirname, '../../junit.xml'));

  console.log('Cleaning up test reports..');
  rimrafSync(path.join(__dirname, '../../TEST_REPORT.md'));
  rimrafSync(path.join(__dirname, '../../test-report.{md,json}'), {
    glob: true,
  });
} catch (err: any) {
  console.error(chalk.red(`Something went wrong: ${err.message}`));
  throw err;
}
