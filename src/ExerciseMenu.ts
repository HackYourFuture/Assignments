import { confirm, select } from '@inquirer/prompts';
import fg from 'fast-glob';
import fs from 'fs';
import assert from 'node:assert/strict';
import path from 'path';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

type MenuData = { [module: string]: { [week: string]: string[] } };

export default class ExerciseMenu {
  #module: any;
  #week = '';
  #exercise = '';
  #assignmentFolder: string;
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

  constructor(assignmentFolder: string) {
    this.#assignmentFolder = assignmentFolder;
    this.compileMenuData();
    this.getMostRecentSelection();
  }

  private compileMenuData() {
    // Look for file and folder names that match the expected structure
    const fileSpec = path.join(__dirname, '../**/assignment/ex+([0-9])-*');

    const filePaths = fg.sync(
      [fileSpec.replace(/\\/g, '/'), '!**/node_modules'],
      {
        onlyFiles: false,
      }
    );

    filePaths.forEach((filePath) => {
      const matches = filePath.match(
        /^.*\/(.+)\/(Week\d)\/assignment\/(.+?)(?:\.js)?$/i
      );
      if (matches) {
        const [, module, week, exercise] = matches;
        if (!this.#menuData[module]) {
          this.#menuData[module] = {};
        }
        if (!this.#menuData[module][week]) {
          this.#menuData[module][week] = [];
        }
        this.#menuData[module][week].push(exercise);
      }
    });
  }

  async getExercisePath() {
    let useRecent = false;
    if (this.#module && this.#week && this.#exercise) {
      useRecent = await confirm({
        message: `Rerun last test (${this.#module}, ${this.#week}, ${this.#exercise})?`,
        default: true,
      });
    }

    if (!useRecent) {
      await this.selectModule();
      await this.selectWeek();
      await this.selectExercise();
      this.putMostRecentSelection();
    }

    let relPath = `../${this.#module}/${this.#week}/${this.#assignmentFolder}/${this.#exercise}`;
    return path.join(__dirname, relPath);
  }

  private async selectModule(): Promise<string> {
    this.#module = await select({
      message: 'Which module?',
      choices: Object.keys(this.#menuData).map((choice) => ({ value: choice })),
      default: this.#module,
    });
    return this.#module;
  }

  private async selectWeek(): Promise<string> {
    assert(this.#module, 'Module must be selected first');

    this.#week = await select({
      message: 'Which week?',
      choices: Object.keys(this.#menuData[this.#module]).map((choice) => ({
        value: choice,
      })),
      default: this.#week,
    });
    return this.#week;
  }

  private async selectExercise(): Promise<string> {
    assert(this.#module, 'Module must be selected first');
    assert(this.#week, 'Week must be selected first');

    this.#exercise = await select({
      message: 'Which exercise?',
      choices: this.#menuData[this.#module][this.#week].map((choice) => ({
        value: choice,
      })),
      default: this.#exercise,
    });

    return this.#exercise;
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
      console.error(err);
    }
  }

  private putMostRecentSelection(): void {
    try {
      const recentSelection = {
        module: this.#module,
        week: this.#week,
        exercise: this.#exercise,
      };
      const json = JSON.stringify(recentSelection, null, 2);
      fs.writeFileSync(path.join(__dirname, '../.recent.json'), json, 'utf8');
    } catch (err: any) {
      console.error(err);
    }
  }

  static makePath(
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
}
