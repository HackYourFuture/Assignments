import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let buffer = '';

export const summary = {
  addHeading(text: string, level = '1') {
    buffer += `${'#'.repeat(+level)} ${text}\n\n`;
    return this;
  },
  addList(items: string[]) {
    for (const item of items) {
      buffer += `- ${item}\n`;
    }
    buffer += '\n';
    return this;
  },
  addRaw(text: string, addEOL = false) {
    buffer += text;
    if (addEOL) {
      buffer += '\n';
    }
    return this;
  },
  addEOL() {
    buffer += '\n';
    return this;
  },
  write() {
    return fs.promises.writeFile(
      path.join(__dirname, '../../test-report.md'),
      buffer
    );
  },
};
