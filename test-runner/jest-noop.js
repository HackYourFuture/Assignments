const chalk = require('chalk');

function noop() {
  if (!global.__jestNoop) {
    console.log(
      chalk.yellow('This is a unit test exercise. Use `npm test` to run it.')
    );
    global.__jestNoop = true;
  }
}

if (!global.it) global.it = noop;
if (!global.describe) global.describe = noop;
