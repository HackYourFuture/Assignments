function giveCompliment(name) {
  const compliments = [
    'great',
    'awesome',
    'good',
    'perfect',
    'glowing',
    'adorable',
    'incredible',
    'wonderful',
    'special',
    'gorgeous',
  ];
  const randomComplement =
    compliments[Math.floor(Math.random() * compliments.length)];
  return `You are ${randomComplement}, ${name}!`;
}

function main() {
  const myName = 'Asiye';

  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));
  console.log(giveCompliment(myName));

  const yourName = 'Amsterdam';

  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
  console.log(giveCompliment(yourName));
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = giveCompliment;
