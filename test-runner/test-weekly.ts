import { getChangedWeeks } from './compliance-helpers.js';
import { exec } from 'node:child_process';

import ExerciseMenu from './ExerciseMenu.js';

function main() {
  const { menuData } = new ExerciseMenu();
  const paths = getChangedWeeks(menuData);
  if (paths.length === 0) {
    console.log('No exercises have changed');
    return;
  }

  if (paths.length > 1) {
    console.error('More than one week has been changed:');
    for (const path of paths) {
      console.error(path);
    }
    return;
  }

  exec(`npx jest ${paths[0]}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

main();
