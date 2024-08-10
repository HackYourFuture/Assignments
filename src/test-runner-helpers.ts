import { confirm, select } from '@inquirer/prompts';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { rimraf } from 'rimraf';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function makePath(
  module: string,
  week: string,
  folder: string,
  exercise?: string
) {
  let relPath = `../${module}/${week}/${folder}`;
  if (exercise) {
    relPath += `/${exercise}`;
  }
  return path.join(__dirname, relPath);
}

type MenuData = { [module: string]: { [week: string]: string[] } };

export function compileMenuData(): MenuData {
  const menuData: MenuData = {};

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

export async function prepareReportFolders(menuData: MenuData) {
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

export function promptUseRecent(
  module: string,
  week: string,
  exercise?: string
): Promise<boolean> {
  return confirm({
    message: `Rerun last test (${module}, ${week}, ${exercise})?`,
    default: true,
  });
}

export async function selectModule(
  choices: string[],
  module?: string
): Promise<string> {
  return select({
    message: 'Which module?',
    choices: choices.map((choice) => ({ value: choice })),
    default: module,
  });
}

export async function selectWeek(
  choices: string[],
  week?: string
): Promise<string> {
  return select({
    message: 'Which week?',
    choices: choices.map((choice) => ({ value: choice })),
    default: week,
  });
}

export async function selectExercise(
  choices: string[],
  exercise?: string
): Promise<string> {
  return select({
    message: 'Which exercise?',
    choices: choices.map((choice) => ({ value: choice })),
    default: exercise,
  });
}

type RecentSelection = { module: string; week: string; exercise: string };

export async function loadMostRecentSelection(): Promise<RecentSelection | null> {
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

export function saveMostRecentSelection(
  module: string,
  week: string,
  exercise: string
): Promise<void> {
  const recentSelection = { module, week, exercise };
  const json = JSON.stringify(recentSelection, null, 2);
  return fs.promises.writeFile(
    path.join(__dirname, '../.recent.json'),
    json,
    'utf8'
  );
}
