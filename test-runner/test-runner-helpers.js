const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const util = require('util');
const inquirer = require('inquirer');
const _rimraf = require('rimraf');
const fg = require('fast-glob');

const rimraf = util.promisify(_rimraf);

function makePath(module, week, folder, exercise) {
  let relPath = `../${module}/${week}/${folder}`;
  if (exercise) {
    relPath += `/${exercise}`;
  }
  return path.join(__dirname, relPath);
}

function compileMenuData() {
  const menuData = {};
  const fileSpec = path
    .join(__dirname, '..', '**/homework/ex+([0-9])-*')
    .replace(/\\/g, '/');
  const filePaths = fg.sync([fileSpec, '!**/node_modules'], {
    onlyFiles: false,
  });

  filePaths.forEach((filePath) => {
    const matches = filePath.match(
      /^.*\/(.+)\/(Week\d)\/homework\/(.+?)(?:\.js)?$/i
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

function computeHash(exercisePath) {
  const md5sum = crypto.createHash('sha256');
  const fileSpec = fs.existsSync(exercisePath) ? '/**/*.js' : '.js';
  const globSpec = (exercisePath + fileSpec).replace(/\\/g, '/');
  const filePaths = fg.sync(globSpec);
  for (const filePath of filePaths) {
    const content = fs.readFileSync(filePath, 'utf8');
    md5sum.update(content);
  }
  return md5sum.digest('hex');
}

async function prepareReportFolders(menuData) {
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

function promptUseRecent(module, week, exercise) {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'useRecent',
      message: `Rerun last test (${module}, ${week}, ${exercise})?`,
      default: true,
    },
  ]);
}

function selectModule(choices, module) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'module',
      message: 'Which module?',
      choices,
      default: module,
    },
  ]);
}

function selectWeek(choices, week) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'week',
      message: 'Which week?',
      choices,
      default: week,
    },
  ]);
}

function selectExercise(choices, exercise) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'exercise',
      message: 'Which exercise?',
      choices,
      default: exercise,
    },
  ]);
}

async function loadMostRecentSelection() {
  try {
    const json = await fs.promises.readFile(
      path.join(__dirname, '../.recent.json'),
      'utf8'
    );
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

function saveMostRecentSelection(module, week, exercise) {
  const json = JSON.stringify({ module, week, exercise });
  return fs.promises.writeFile(
    path.join(__dirname, '../.recent.json'),
    json,
    'utf8'
  );
}

module.exports = {
  compileMenuData,
  computeHash,
  prepareReportFolders,
  makePath,
  promptUseRecent,
  selectModule,
  selectWeek,
  selectExercise,
  loadMostRecentSelection,
  saveMostRecentSelection,
};
