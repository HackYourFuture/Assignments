"use strict";

const employeeRecords = [
  {
    name: "John",
    occupation: "developer",
    gender: "M",
    email: "john.doe@somewhere.net",
    salary: 50000,
  },
  {
    name: "Jane",
    occupation: "manager",
    gender: "F",
    email: "jane.eyre@somewhere.net",
    salary: 60000,
  },
];
// ! Function under test
function filterPrivateData(employeeRecords) {
  // TODO complete this function
  const [{ name, occupation, email }] = employeeRecords;
  return employeeRecords;
}

// filterPrivateData(employeeRecords);
// ! Test functions (plain vanilla JavaScript)
function test1() {
  console.log("Test 1: filterPrivateData should take one parameters");
  console.assert(filterPrivateData.length === 1);
}

function test2() {
  console.log("Test 2: gender and salary should be filtered out");
  const expected = [
    {
      name: "John",
      occupation: "developer",
      email: "john.doe@somewhere.net",
    },
    {
      name: "Jane",
      occupation: "manager",
      email: "jane.eyre@somewhere.net",
    },
  ];
  const result = filterPrivateData(employeeRecords);
  console.assert(JSON.stringify(result) === JSON.stringify(expected));
}

function test() {
  test1();
  test2();
}

test();
