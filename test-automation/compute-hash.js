const fs = require("fs").promises;
const { existsSync } = require("fs");
const util = require("util");
const _glob = require("glob");
const crypto = require("crypto");

const glob = util.promisify(_glob);

async function computeHash(exercisePath) {
  const md5sum = crypto.createHash("md5");
  const fileSpec = existsSync(exercisePath) ? "/**/*.js" : ".js";
  const globSpec = exercisePath + fileSpec;
  const filePaths = await glob(globSpec);
  for (const filePath of filePaths) {
    const content = await fs.readFile(filePath, "utf8");
    md5sum.update(content);
  }
  return md5sum.digest("hex");
}

module.exports = computeHash;
