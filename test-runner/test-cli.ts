import 'dotenv/config';

import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  checkExerciseHashes,
  checkForUntestedExercises,
  getUntestedExercises,
  isValidBranchName,
} from './compliance.js';
import ExerciseMenu from './ExerciseMenu.js';
import { runTest } from './test-runner.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MINIMUM_NODE_VERSION = 20;

const disclaimer = `
*** Disclaimer **

The test checker is an automated runner that follows 
a very strict set of rules defined by us, which means
it is possible that it gives you incorrect feedback 
if you solved the problem in a way we did not foresee.
See the results here as suggestions, not the truth!
`;

async function showDisclaimer(): Promise<void> {
  const disclaimerPath = path.join(__dirname, '../.disclaimer');
  const suppressDisclaimer = fs.existsSync(disclaimerPath);
  if (!suppressDisclaimer) {
    console.log(chalk.magenta(disclaimer));
    await fs.promises.writeFile(disclaimerPath, 'off', 'utf8');
  }
}

async function main(): Promise<void> {
  const [majorVersion] = process.versions.node.split('.');
  if (+majorVersion < MINIMUM_NODE_VERSION) {
    console.log(
      chalk.red(`Required Node version: ${MINIMUM_NODE_VERSION} or higher.`)
    );
    console.log(
      chalk.red(
        `Your version: ${majorVersion}. Please upgrade your version of Node.`
      )
    );
    process.exit(1);
  }

  try {
    const assignmentFolder = process.env.ASSIGNMENT_FOLDER || 'assignment';

    const menu = new ExerciseMenu(assignmentFolder);

    if (!(await isValidBranchName(menu))) {
      process.exit(1);
    }

    const moduleWeek = checkExerciseHashes(menu.menuData);
    if (moduleWeek === 'multiple') {
      return;
    }

    await menu.getExercisePath();

    const untestedExercises = getUntestedExercises(menu.menuData);
    const isUntested = untestedExercises.includes(
      `${menu.module}/${menu.week}/${menu.exercise}`
    );

    console.log('Running test, please wait...');

    await runTest(
      menu.module,
      menu.week,
      menu.exercise,
      isUntested,
      assignmentFolder
    );

    await showDisclaimer();

    checkForUntestedExercises(menu);
  } catch (err: any) {
    if (err.name === 'ExitPromptError') {
      console.log(chalk.red('Test run aborted.'));
    } else {
      const message = `Something went wrong: ${err.message}`;
      console.error(chalk.red(message));
      throw err;
    }
  }
}

main();
