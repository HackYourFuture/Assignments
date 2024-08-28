import 'dotenv/config';

import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  checkExerciseHashes,
  getUntestedExercises,
  isValidBranchName,
  updateTestHash,
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

    console.log('Running test, please wait...');

    const report = await runTest(
      menu.module,
      menu.week,
      menu.exercise,
      assignmentFolder
    );

    if (report) {
      await showDisclaimer();
    }

    updateTestHash(menu.module, menu.week, menu.exercise);

    const untestedExercises = getUntestedExercises(menu.menuData);
    if (untestedExercises.length > 0) {
      if (untestedExercises.length === 1) {
        console.log(
          chalk.yellow(`There is one untested exercise remaining:\n`)
        );
      } else {
        console.log(
          chalk.yellow(
            `There are ${untestedExercises.length} untested exercises remaining:\n`
          )
        );
      }
      for (const exercise of untestedExercises) {
        console.log(chalk.yellow(`• ${exercise}`));
      }

      console.log();
    }
  } catch (err: any) {
    if (err.name === 'ExitPromptError') {
      console.log(chalk.red('Test run aborted.'));
    } else {
      const message = `Something went wrong: ${err.message}`;
      console.error(chalk.red(message));
    }
  }
}

main();
