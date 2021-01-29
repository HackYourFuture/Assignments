//cspell: disable
const simpleGit = require('simple-git');
const chalk = require('chalk');
const logger = require('./logger');

const git = simpleGit();

const branchNames = [
  'javascript/week3',
  'javascript/week4',
  'browsers/week1',
  'usingapis/week1',
  'usingapis/week2',
];

async function addRemoteUpstream() {
  try {
    await git.addRemote(
      'upstream',
      'https://github.com/HackYourFuture/Homework.git'
    );
    const message = 'Git remote upstream created.';
    logger.info(message);
    console.log(chalk.green(message));
  } catch (err) {
    if (!err.message.includes('remote upstream already exists')) {
      throw err;
    }
    const message = 'Git remote upstream exist already.';
    logger.warn(message);
    console.log(chalk.yellow('Git remote upstream exist already.'));
  }
}

async function createBranches() {
  const promises = branchNames.map((branchName) => git.branch([branchName]));
  const results = await Promise.allSettled(promises);
  const rejectedResults = results.filter(
    (result) => result.status === 'rejected'
  );

  const unexpectedErrors = rejectedResults.filter(
    (result) => !result.reason.message.includes('already exists')
  );
  if (unexpectedErrors.length === 0) {
    const message = 'Local git branches exist already.';
    logger.warn(message);
    console.log(chalk.yellow(message));
  } else {
    throw new Error('Unexpected error while creating branches');
  }
  if (rejectedResults.length === 0) {
    const message = 'Local git branches created.';
    logger.info(message);
    console.log(chalk.green(message));
  }
}

async function checkoutFirstBranch() {
  const [firstBranch] = branchNames;
  await git.checkout(firstBranch);
  const message = `Checked out the ${firstBranch}`;
  logger.info(message);
  console.log(chalk.green(message));
}

(async () => {
  try {
    const message = 'Setting up git upstream and branches.';
    logger.info(message);
    console.log(message);
    await addRemoteUpstream();
    await createBranches();
    await checkoutFirstBranch();
  } catch (err) {
    const message = `Something went wrong: ${err.message}`;
    logger.error(message);
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
})();
