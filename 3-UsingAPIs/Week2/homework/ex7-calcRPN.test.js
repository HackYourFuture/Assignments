require('../../../test-runner/jest-noop');

// Supported calculator operations (opcodes and corresponding functions)
const instructionSet = {
  '+': (x, y) => y + x,
  '-': (x, y) => y - x,
  '*': (x, y) => y * x,
  '/': (x, y) => y / x,
  chg: (x) => -x,
};

/**
 * Execute a single operation
 * @param {number[]} stack Input stack
 * @param {(string|number)} opcode Operation code or number
 * @returns {number[]} Output stack
 */
function executeOperation(stack, opcode) {
  // An opcode that is a number is inserted into the stack
  if (typeof opcode === 'number') {
    return [opcode, ...stack];
  }

  // Any other opcode must represent a predefined instruction
  const operation = instructionSet[opcode];
  if (!operation) {
    throw new Error(`Unsupported operation: '${opcode}'`);
  }

  let x, y, rest, result;

  // `operation.length` return the number of parameters that a function accepts.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
  switch (operation.length) {
    case 1:
      [x, ...rest] = stack;
      result = operation(x);
      break;
    case 2:
      [x, y, ...rest] = stack;
      result = operation(x, y);
      break;
    default:
      throw new Error(
        `Operation '${opcode}' requires unsupported number of operands: ${operation.length}`
      );
  }

  return [result, ...rest];
}

/**
 * Execute a sequence of operations
 * @param {(string|number)[]} opcodes An array of opcodes
 * @param {number[]} stack Input stack
 * @returns {number[]} Output stack
 */
function executeSequence(opcodes, stack = []) {
  return opcodes.reduce(executeOperation, stack);
}

// ! Start Of Unit Tests

describe('RPN Calculator', () => {
  describe('executeOperation', () => {
    it('opcode `+` should add two numbers', () => {
      const stack = [1, 2];
      const result = executeOperation(stack, '+');
      expect(result).toEqual([3]);
    });

    it('opcode `chg` change the sign', () => {
      const stack = [1];
      const result = executeOperation(stack, 'chg');
      expect(result).toEqual([-1]);
    });
  });

  describe('executeProgram', () => {
    const programs = {
      add: [4, 2, '+'],
      subtract: [4, 2, '-'],
    };

    it('should execute program add', () => {
      const result = executeSequence(programs.add);
      expect(result).toEqual([6]);
    });

    it('should execute program subtract', () => {
      const result = executeSequence(programs.subtract);
      expect(result).toEqual([2]);
    });
  });
});
