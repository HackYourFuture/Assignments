// @ts-check
import { confirm, select } from '@inquirer/prompts';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { rimraf } from 'rimraf';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 *
 * @param {string} module
 * @param {string} week
 * @param {string} folder
 * @param {string} [exercise]
 * @returns {string}
 */
export function makePath(module, week, folder, exercise) {
  let relPath = `../${module}/${week}/${folder}`;
  if (exercise) {
    relPath += `/${exercise}`;
  }
  return path.join(__dirname, relPath);
}

/**
 *
 * @typedef {{[module: string]: {[week: string]: string[]}}} MenuData
 */

/**
 * @returns {MenuData}
 */
export function compileMenuData() {
  /** @type MenuData */
  const menuData = {};

  // Look for file and folder names that match the expected structure
  const fileSpec = path
    .join(__dirname, '../**/assignment/ex+([0-9])-*')
    .replace(/\\/g, '/');

  const filePaths = fg.sync([fileSpec, '!**/node_modules'], {
    onlyFiles: false,
  });

  filePaths.forEach((filePath) => {
    const matches = filePath.match(
      /^.*\/(.+)\/(Week\d)\/assignment\/(.+?)(?:\.js)?$/i
    );
    if (matches) {
      const [, module, week, exercise] = matches;
      if (!menuData[module]) {
        menuData[module] = {};
      }
      if (!menuData[module][week]) {
        menuData[module][week] = [];
      }
      menuData[module][week].push(exercise);
    }
  });

  return menuData;
}

/**
 *
 * @param {MenuData} menuData
 */
export async function prepareReportFolders(menuData) {
  for (const moduleName of Object.keys(menuData)) {
    const weeks = Object.keys(menuData[moduleName]);

    for (const week of weeks) {
      const dirPath = makePath(moduleName, week, 'test-reports');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(
          `Created \`test-reports\` folder for ${moduleName}/${week}`
        );
      } else {
        await rimraf(path.normalize(`${dirPath}/*`));
      }
      const exercises = menuData[moduleName][week];
      for (const exercise of exercises) {
        const reportPath = path.join(dirPath, `${exercise}.todo.txt`);
        fs.writeFileSync(reportPath, 'This test has not been run.', 'utf8');
      }
      console.log(`Initialized test reports for ${moduleName}/${week}`);
    }
  }
}

/**
 *
 * @param {string} module
 * @param {string} week
 * @param {string} exercise
 * @returns {Promise<boolean>}
 */
export function promptUseRecent(module, week, exercise) {
  return confirm({
    message: `Rerun last test (${module}, ${week}, ${exercise})?`,
    default: true,
  });
}

/**
 *
 * @param {string[]} choices
 * @param {string} [module]
 * @returns {Promise<string>}
 */
export async function selectModule(choices, module) {
  return select({
    message: 'Which module?',
    choices: choices.map((choice) => ({ value: choice })),
    default: module,
  });
}

/**
 *
 * @param {string[]} choices
 * @param {string} [week]
 * @returns {Promise<string>}
 */
export async function selectWeek(choices, week) {
  return select({
    message: 'Which week?',
    choices: choices.map((choice) => ({ value: choice })),
    default: week,
  });
}

/**
 *
 * @param {string[]} choices
 * @param {string} [exercise]
 * @returns {Promise<string>}
 */ export async function selectExercise(choices, exercise) {
  return select({
    message: 'Which exercise?',
    choices: choices.map((choice) => ({ value: choice })),
    default: exercise,
  });
}

/** @typedef {{module: string, week: string, exercise: string}} RecentSelection */

/**
 *
 * @returns {Promise<RecentSelection | null>}
 */
export async function loadMostRecentSelection() {
  try {
    const json = await fs.promises.readFile(
      path.join(__dirname, '../.recent.json'),
      'utf8'
    );
    const recentSelection = JSON.parse(json);
    return recentSelection;
  } catch (_) {
    return null;
  }
}

/**
 *
 * @param {string} module
 * @param {string} week
 * @param {string} exercise
 * @returns {Promise<void>}
 */
export function saveMostRecentSelection(module, week, exercise) {
  const recentSelection = { module, week, exercise };
  const json = JSON.stringify(recentSelection, null, 2);
  return fs.promises.writeFile(
    path.join(__dirname, '../.recent.json'),
    json,
    'utf8'
  );
}
