function selectRandomly(numKids, partnerNames, locations, jobTitles) {
  return (
    numKids[Math.floor(Math.random() * numKids.length)] +
    ' ' +
    partnerNames[Math.floor(Math.random() * partnerNames.length)] +
    ' ' +
    locations[Math.floor(Math.random() * locations.length)] +
    ' ' +
    jobTitles[Math.floor(Math.random() * jobTitles.length)]
  );
}

function tellFortune(numKids, partnerNames, locations, jobTitles) {
  return (
    'You will be a ' +
    jobTitles[Math.floor(Math.random() * jobTitles.length)] +
    ' in ' +
    locations[Math.floor(Math.random() * locations.length)] +
    ', married to ' +
    partnerNames[Math.floor(Math.random() * partnerNames.length)] +
    ' with ' +
    numKids[Math.floor(Math.random() * numKids.length)] +
    ' kids.'
  );
}

function main() {
  const numKids = [0, 1, 2, 3, 4];

  const partnerNames = ['Tony', 'Adam', 'Mike', 'David', 'Rob'];

  const locations = ['NewYork', 'Hollywood', 'London', 'Istanbul', 'Amsterdam'];

  const jobTitles = ['Doctor', 'Teacher', 'Engineer', 'Lawyer', 'Footballer'];

  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = tellFortune;
