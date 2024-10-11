import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { getExerciseMap } from './exercises.js';

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function testReportsCheck() {
  try {
    const { stdout } = await execAsync('git branch --show-current');
    const branchName = stdout.trim();

    // Mandated branch name format: TRAINEE_NAME-wW-MODULE_NAME
    const match = branchName.match(/-w(\d+)-(.*)/);
    if (!match) {
      throw new Error('Non-compliant branch name');
    }

    const weekNum = match[1];
    const moduleName = match[2];
    const modulePattern = new RegExp(String.raw`^\d+-${moduleName}$`, 'i');

    const exerciseHashes = getExerciseMap();

    const module = Object.keys(exerciseHashes).find((key) =>
      modulePattern.test(key)
    );

    if (!module) {
      throw new Error(`Invalid module name: ${moduleName}`);
    }

    const week = Object.keys(exerciseHashes[module]).find((key) =>
      key.endsWith(weekNum)
    );

    if (!week) {
      throw new Error(`Invalid week number: ${weekNum}`);
    }

    const exercises = Object.keys(exerciseHashes[module][week]);

    const testReportFolder = `../../${module}/${week}/test-reports`;

    const missingFiles: string[] = [];

    const testSummaryFile = path
      .join(__dirname, '../../.test-summary/TEST_SUMMARY.md')
      .replaceAll(/\\/g, '/');
    if (!fs.existsSync(testSummaryFile)) {
      missingFiles.push('TEST_SUMMARY.md');
    }

    for (const exercise of exercises) {
      const testReportFileName = `${exercise}.report.txt`;
      const testReportFile = path
        .join(__dirname, testReportFolder, testReportFileName)
        .replaceAll(/\\/g, '/');
      const testReportExists = fs.existsSync(testReportFile);
      if (!testReportExists) {
        missingFiles.push(testReportFileName);
      }
    }

    if (missingFiles.length > 0) {
      throw new Error(`Missing test report files: ${missingFiles.join(', ')}`);
    }

    process.exit(0);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
}

testReportsCheck();
