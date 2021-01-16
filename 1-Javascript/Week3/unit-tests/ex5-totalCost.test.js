/* eslint-disable hyf/camelcase */
"use strict";
const acorn = require("acorn");
const walk = require("acorn-walk");

function expectedReceived(expected, received) {
  if (expected === received) {
    return "";
  }
  return `\nExpected: ${expected}\nReceived: ${received}`;
}

describe("addToShoppingCart", () => {
  let logSpy;
  let calculateTotalPrice;
  let cartForParty;
  let rootNode;

  beforeAll(() => {
    const spy = jest.spyOn(console, "log").mockImplementation();
    ({
      cartForParty,
      calculateTotalPrice,
    } = require("../homework/ex5-totalCost"));
    const source = calculateTotalPrice.toString();
    rootNode = acorn.parse(source, { ecmaVersion: 2020 });
    spy.mockRestore();
  });

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("cartForParty should contain 5 priced grocery items ", () => {
    expect(typeof cartForParty).toBe("object");
    expect(Object.keys(cartForParty)).toHaveLength(5);
    expect(
      Object.values(cartForParty).every((value) => typeof value === "number")
    ).toBe(true);
  });

  it("should take a single parameter", () => {
    // students often make the mistake of accessing global
    // variables instead of taking parameters
    let numParams = 0;
    walk.simple(rootNode, {
      FunctionDeclaration(node) {
        if (node.id.name === "calculateTotalPrice") {
          numParams = node.params.length;
        }
      },
      ArrowFunctionExpression(node) {
        numParams = node.params.length;
      },
    });

    expect(numParams).toBe(1);
  });

  it('should output "Total: €<amount>"', () => {
    calculateTotalPrice(cartForParty);
    expect(logSpy).toHaveBeenCalled();

    const total = Object.values(cartForParty).reduce(
      (sum, price) => sum + price
    );

    const expected = `Total: €${total.toFixed(2)}`;

    const message = expectedReceived(expected, logSpy.mock.calls[0][0]);
    expect(message).toBe("");
  });
});
