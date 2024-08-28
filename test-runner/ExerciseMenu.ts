import { confirm, select } from '@inquirer/prompts';
import fg from 'fast-glob';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getUntestedExercises } from './compliance.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type MenuData = { [module: string]: { [week: string]: string[] } };
type ExercisePathOptions = { isTest: boolean };

export function buildExercisePath(
  module: string,
  week: string,
  exercise: string,
  assignmentFolder = 'assignment'
) {
  return path
    .join(__dirname, `../../${module}/${week}/${assignmentFolder}/${exercise}`)
    .replace(/\\/g, '/');
}

export default class ExerciseMenu {
  #assignmentFolder: string;
  #module = '';
  #week = '';
  #exercise = '';
  #menuData: MenuData = {};

  get module() {
    return this.#module;
  }

  get week() {
    return this.#week;
  }

  get exercise() {
    return this.#exercise;
  }

  get menuData() {
    return this.#menuData;
  }

  constructor(assignmentFolder = 'assignment') {
    this.#assignmentFolder = assignmentFolder;
    this.compileMenuData();
    this.getMostRecentSelection();
  }

  private compileMenuData() {
    // Look for file and folder names that match the expected structure.
    // Windows paths are converted to POSIX paths to ensure compatibility.
    const posixFileSpec = path
      .join(__dirname, `../../**/${this.#assignmentFolder}/ex([0-9])-*`)
      .replace(/\\/g, '/');

    const filePaths = fg.sync([posixFileSpec, '!**/node_modules'], {
      onlyFiles: false,
    });

    filePaths.forEach((filePath) => {
      const regexp = RegExp(
        String.raw`^.*/(.+)/(Week\d)/${this.#assignmentFolder}/(.+?)(?:\.js)?$`,
        'i'
      );
      const matches = filePath.match(regexp);
      if (matches) {
        const [, module, week, exercise] = matches;
        if (!this.menuData[module]) {
          this.menuData[module] = {};
        }
        if (!this.menuData[module][week]) {
          this.menuData[module][week] = [];
        }
        this.menuData[module][week].push(exercise);
      }
    });
  }

  async getExercisePath(
    options: ExercisePathOptions = { isTest: true }
  ): Promise<string> {
    let haveSelection = false;

    const untestedExercises = getUntestedExercises(this.menuData);

    // If there is at least one untested exercise, ask the user whether to use it.
    if (untestedExercises.length > 0) {
      const [module, week, exercise] = untestedExercises[0].split('/');
      const prompt = options.isTest
        ? 'Test modified exercise'
        : 'Run modified exercise';
      haveSelection = await confirm({
        message: `${prompt} (${module}, ${week}, ${exercise})?`,
        default: true,
      });
      if (haveSelection) {
        this.#module = module;
        this.#week = week;
        this.#exercise = exercise;
      }
    }

    // If there is no untested exercise, ask the user if they want to rerun the last test.
    if (!haveSelection && this.module && this.week && this.exercise) {
      const prompt = options.isTest ? 'Rerun last test' : 'Rerun last exercise';
      haveSelection = await confirm({
        message: `${prompt} (${this.module}, ${this.week}, ${this.exercise})?`,
        default: true,
      });
    }

    if (!haveSelection) {
      await this.selectModule();
      await this.selectWeek();
      await this.selectExercise();
      this.putMostRecentSelection();
    }

    return buildExercisePath(
      this.module,
      this.week,
      this.exercise,
      this.#assignmentFolder
    );
  }

  private async selectModule(): Promise<string> {
    const module = await select({
      message: 'Which module?',
      choices: Object.keys(this.menuData).map((choice) => ({ value: choice })),
      default: this.module,
    });

    if (module !== this.module) {
      this.#module = module;
      this.#week = '';
      this.#exercise = '';
    }
    return module;
  }

  private async selectWeek(): Promise<string> {
    assert(this.module, 'Module must be selected first');

    const week = await select({
      message: 'Which week?',
      choices: Object.keys(this.menuData[this.module]).map((choice) => ({
        value: choice,
      })),
      default: this.week,
    });

    if (week !== this.week) {
      this.#week = week;
      this.#exercise = '';
    }
    return week;
  }

  private async selectExercise(): Promise<string> {
    assert(this.module, 'Module must be selected first');
    assert(this.week, 'Week must be selected first');

    this.#exercise = await select({
      message: 'Which exercise?',
      choices: this.menuData[this.module][this.week].map((choice) => ({
        value: choice,
      })),
      default: this.exercise,
    });

    return this.exercise;
  }

  private getMostRecentSelection(): void {
    try {
      const json = fs.readFileSync(
        path.join(__dirname, '../.recent.json'),
        'utf8'
      );
      const recentSelection = JSON.parse(json);
      const { module, week, exercise } = recentSelection;
      this.#module = module;
      this.#week = week;
      this.#exercise = exercise;
    } catch (err: any) {
      // Ignore errors
    }
  }

  private putMostRecentSelection(): void {
    try {
      const recentSelection = {
        module: this.module,
        week: this.week,
        exercise: this.exercise,
      };
      const json = JSON.stringify(recentSelection, null, 2);
      fs.writeFileSync(path.join(__dirname, '../.recent.json'), json, 'utf8');
    } catch (err: any) {
      console.error(err);
    }
  }
}
