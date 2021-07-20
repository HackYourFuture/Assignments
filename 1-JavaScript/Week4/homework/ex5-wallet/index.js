'use strict';

// Based on an example from: Philipp Beau (@ze_german)

const eurosFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

function createWallet(name, cash = 0) {
  function deposit(amount) {
    cash += amount;
  }

  function withdraw(amount) {
    if (cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    cash -= amount;
    return amount;
  }

  function transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(
        amount
      )} from ${name} to ${wallet.getName()}`
    );
    const withdrawnAmount = withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  function reportBalance() {
    console.log(`Name: ${name}, balance: ${eurosFormatter.format(cash)}`);
  }

  const getName = () => name;

  return {
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
  };
}

const walletJack = createWallet('Jack', 100);
const walletJoe = createWallet('Joe', 10);
const walletJane = createWallet('Jane', 20);

walletJack.transferInto(walletJoe, 50);
walletJane.transferInto(walletJoe, 25);

walletJane.deposit(20);
walletJane.transferInto(walletJoe, 25);

walletJack.reportBalance();
walletJoe.reportBalance();
walletJane.reportBalance();

// * End of exercise code

/*******************************************************************************
 * TODO: Multiple choice: provide your answers by replacing `undefined` with the
 * TODO: letter corresponding to your choice, e.g.  answer: 'a'
 ******************************************************************************/
// prettier-ignore
// eslint-disable-next-line no-unused-vars
const quiz = {
  q1: {
    question: 'At line 26, which variables are in the scope marked Closure?',
    choices: { 
      a: 'There is no scope marked Closure', 
      b: 'cash, name', 
      c: 'amount, this, wallet'
    },
    answer: 'b',
  },
  q2: {
    question: 'What is in the Call Stack, from top to bottom?',
    choices: { 
      a: 'withdraw, anonymous', 
      b: 'anonymous, transferInto', 
      c: 'transferInto, anonymous' 
    },
    answer: 'c',
  },
  q3: {
    question: 'What tooltip appears when hovering over the third debug button?',
    choices: { 
      a: 'Step into next function call', 
      b: 'Step out of current function', 
      c: 'Step' 
    },
    answer: 'a',
  },
  q4: {
    question: 'What is displayed in the console?',
    choices: { 
      a: 'Transferring € 50,00 from Jack to Joe', 
      b: 'Transferring € 50,00 from Jack to undefined', 
      c: 'Transferring € 50,00 from Jack to Jane' 
    },
    answer: 'a',
  },
  q5: {
    question: 'The owner of the wallet with insufficient funds is:',
    choices: { 
      a: 'Jack', 
      b: 'Joe', 
      c: 'Jane' 
    },
    answer: 'c',
  },
};
