const mathOperations = {
  '+': (x, y) => y + x,
  '-': (x, y) => y - x,
  '*': (x, y) => y * x,
  '/': (x, y) => y / x,
  chs: (x) => -x,
};

const stackOperations = {
  swap: ([x, y, ...rest]) => [y, x, ...rest],
  dup: ([x, y, z]) => [x, x, y, z],
};

/**
 * Returns an array of opcodes.
 * @returns An array of opcodes
 */
function getOpcodes() {
  return [...Object.keys(mathOperations), ...Object.keys(stackOperations)];
}

/**
 * Check if the argument is a finite number.
 * Throws an error if it is not.
 * @param {*} result
 * @returns
 */
function check(result) {
  if (!Number.isFinite(result)) {
    throw new Error('Invalid result');
  }
  return result;
}

/**
 * Execute a single operation.
 * @param {number[]} stack Input stack
 * @param {(string|number)} opcode Operation code or number
 * @returns {number[]} Output stack
 */
function executeOperation(stack, opcode) {
  // An opcode that is a number is inserted into the stack
  if (typeof opcode === 'number') {
    const [x, y, z] = stack;
    return [check(opcode), x, y, z];
  }

  // Stack operations take the whole stack as an argument
  let operation = stackOperations[opcode];
  if (operation) {
    return operation(stack);
  }

  // Any other opcode must represent a math function
  operation = mathOperations[opcode];
  if (!operation) {
    throw new Error(`Unsupported operation: '${opcode}'`);
  }

  // `operation.length` return the number of parameters that a function accepts.
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
  switch (operation.length) {
    case 1: {
      // unary operations
      const [x, ...rest] = stack;
      return [check(operation(x)), ...rest];
    }
    case 2: {
      // binary operations
      const [x, y, ...rest] = stack;
      return [check(operation(x, y)), ...rest, 0];
    }
    default:
      throw new Error(
        `Operation '${opcode}': unsupported number of parameters (${operation.length})`
      );
  }
}

/**
 * Execute a sequence of operations
 * @param {(string|number)[]} opcodes An array of opcodes
 * @param {number[]} stack Input stack
 * @returns {number[]} Output stack
 */
function executeSequence(opcodes, stack = [0, 0, 0, 0]) {
  return opcodes.reduce(executeOperation, stack);
}

// ! Do not change or remove the code below
try {
  // Exports for use with node / jest
  module.exports = {
    getOpcodes,
    executeOperation,
    executeSequence,
  };
} catch (_) {
  // Ignored when used in browser
}
