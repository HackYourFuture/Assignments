const fs = require("fs").promises;
const util = require("util");
const _copy = require("recursive-copy");
const _rimraf = require("rimraf");
const { HtmlValidate } = require("html-validate");
const { getFormatter } = require("html-validate/dist/cli/formatter");
const htmlValidateOptions = require("../.htmlValidate.json");
const stylish = getFormatter("stylish");

const copy = util.promisify(_copy);
const rimraf = util.promisify(_rimraf);

const config = {
  baseUrl: "http://localhost:5000/",
  blockedResourceTypes: ["image", "stylesheet", "font"],
};

async function copyFiles(exercisesDir) {
  try {
    await fs.mkdir("./temp");
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }

  return copy(exercisesDir, "./temp", { overwrite: true });
}

function deleteFiles() {
  return rimraf("./temp");
}

async function setUp(page) {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (config.blockedResourceTypes.includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });
  return page.goto(config.baseUrl, { waitUntil: "networkidle0" });
}

async function prepare(page) {
  const homeworkFolder = process.env.HOMEWORK_FOLDER || "homework";

  const { testPath } = expect.getState();
  const exercisePath = testPath
    .replace("unit-tests", homeworkFolder)
    .replace(/\.test\.js$/, "");
  await copyFiles(exercisePath);
  return setUp(page);
}

const htmlValidate = new HtmlValidate(htmlValidateOptions);

async function validateHTML() {
  const outerHTML = await page.evaluate(
    () => document.documentElement.outerHTML
  );
  const htmlText = `<!DOCTYPE html>\n${outerHTML}`;
  const report = htmlValidate.validateString(htmlText);
  const validationReport = stylish(report);
  expect(validationReport).toBe("");
}

module.exports = {
  prepare,
  deleteFiles,
  validateHTML,
};
