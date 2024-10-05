import { confirm, select } from '@inquirer/prompts';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getUntestedExercises } from './compliance.js';
import { ExerciseHashes, getExerciseMap } from './exercises.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type ExercisePathOptions = { isTest: boolean };

export function buildExercisePath(
  module: string,
  week: string,
  exercise: string
) {
  return path
    .join(__dirname, `../../${module}/${week}/assignment/${exercise}`)
    .replace(/\\/g, '/');
}

export default class ExerciseMenu {
  #module = '';
  #week = '';
  #exercise = '';
  #exerciseHashes: ExerciseHashes = {};

  get module() {
    return this.#module;
  }

  get week() {
    return this.#week;
  }

  get exercise() {
    return this.#exercise;
  }

  get exerciseHashes() {
    return this.#exerciseHashes;
  }

  constructor() {
    this.#exerciseHashes = getExerciseMap();
    this.getMostRecentSelection();
  }

  async getExercisePath(
    options: ExercisePathOptions = { isTest: true }
  ): Promise<string> {
    let haveSelection = false;

    const untestedExercises = getUntestedExercises(this.exerciseHashes);

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

    return buildExercisePath(this.module, this.week, this.exercise);
  }

  private async selectModule(): Promise<string> {
    const module = await select({
      message: 'Which module?',
      choices: Object.keys(this.exerciseHashes).map((choice) => ({
        value: choice,
      })),
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
      choices: Object.keys(this.exerciseHashes[this.module]).map((choice) => ({
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
      choices: Object.keys(this.exerciseHashes[this.module][this.week]).map(
        (choice) => ({
          value: choice,
        })
      ),
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
