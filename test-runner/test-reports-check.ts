import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { diffExerciseHashes } from './compliance.js';
import { getExerciseMap } from './exercises.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function testReportsCheck() {
  try {
    const exerciseHashes = getExerciseMap();
    const diff = diffExerciseHashes(exerciseHashes);

    if (Object.keys(diff).length === 0) {
      process.exit(0);
    }

    const missingFiles: string[] = [];

    const testSummaryFile = path
      .join(__dirname, '../../.test-summary/TEST_SUMMARY.md')
      .replaceAll(/\\/g, '/');
    if (!fs.existsSync(testSummaryFile)) {
      missingFiles.push('TEST_SUMMARY.md');
    }

    for (const module in diff) {
      for (const week in diff[module]) {
        const testReportFolder = `../../${module}/${week}/test-reports`;
        for (const exercise in diff[module][week]) {
          const testReportFileName = `${exercise}.report.txt`;
          const testReportFile = path
            .join(__dirname, testReportFolder, testReportFileName)
            .replaceAll(/\\/g, '/');
          const testReportExists = fs.existsSync(testReportFile);
          if (!testReportExists) {
            missingFiles.push(testReportFileName);
          }
        }
      }
    }

    if (missingFiles.length > 0) {
      throw new Error(`Missing test report files:\n${missingFiles.join('\n')}`);
    }
    process.exit(0);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
}

testReportsCheck();
