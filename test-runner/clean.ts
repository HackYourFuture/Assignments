import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { rimrafSync } from 'rimraf';
import { fileURLToPath } from 'url';
import { createExerciseHashes } from './compliance-helpers.js';
import ExerciseMenu, { MenuData } from './ExerciseMenu.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function initializeReportFolders(menuData: MenuData) {
  for (const module of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[module]);

    for (const week of weeks) {
      const dirPath = path.join(
        __dirname,
        `../../${module}/${week}/test-reports`
      );
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Created 'test-reports' folder for ${module}/${week}`);
      } else {
        const globPath = path.join(dirPath, '/**/*').replace(/\\/g, '/');
        rimrafSync(globPath, { glob: true });
      }
      const exercises = menuData[module][week];
      for (const exercise of exercises) {
        const reportPath = path.join(dirPath, `${exercise}.todo.txt`);
        fs.writeFileSync(reportPath, 'This test has not been run.', 'utf8');
      }
      console.log(`Created 'todo' test reports for ${module}/${week}`);
    }
  }
}

try {
  const { menuData } = new ExerciseMenu();

  console.log('Computing and saving exercise hashes...');
  createExerciseHashes(menuData);

  console.log('Initializing report folders...');
  await initializeReportFolders(menuData);

  console.log('Cleaning up test-runner.log file...');
  rimrafSync(path.join(__dirname, '../../test-runner.log'));

  console.log('Cleaning up junit.xml...');
  rimrafSync(path.join(__dirname, '../../junit.xml'));
} catch (err: any) {
  console.error(chalk.red(`Something went wrong: ${err.message}`));
  throw err;
}
