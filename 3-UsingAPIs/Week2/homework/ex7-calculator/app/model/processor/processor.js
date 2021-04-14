import check from '../../utils/check.js';
import bufferFunctions from './functions/buffer.js';
import unaryFunctions from './functions/unary.js';
import binaryFunctions from './functions/binary.js';
import stackFunctions from './functions/stack.js';
import './importExtensions.js';

const initialState = {
  stack: [0, 0, 0, 0],
  memory: [0, 0, 0, 0],
  buffer: '',
  stackLift: true,
  arc: false,
  keyCode: null,
  error: null,
};

const stackLiftPrevention = ['enter', 'clx', 'sto'];

export function getImportedFunctions() {
  return [unaryFunctions, binaryFunctions, stackFunctions].reduce(
    (acc, functionMap) => {
      Object.entries(functionMap).forEach(([name, func]) => {
        if (func.type === 'import') {
          acc.push({ name, func });
        }
      });
      return acc;
    },
    []
  );
}

export function addFunction(name, func) {
  func.type = 'import';
  switch (func.length) {
    case 1:
      unaryFunctions[name] = func;
      return;
    case 2:
      binaryFunctions[name] = func;
      break;
    default:
      throw new Error(`Unsupported function type: ${func.length}`);
  }
}

const liftStack = ([x, y, z]) => [x, x, y, z];

export function execute(state = initialState, keyCode) {
  try {
    const extras = {
      keyCode,
      buffer: '',
      arc: false,
      stackLift: !stackLiftPrevention.includes(keyCode),
      error: null,
    };

    let func = bufferFunctions[keyCode];
    if (func && !(keyCode === 'chs' && state.buffer === '')) {
      const { stackLift } = state;
      let { buffer, stack } = state;
      if (buffer === '' && stackLift) {
        stack = liftStack(state.stack);
      }

      buffer = func(buffer);

      const [, y, z, t] = stack;
      stack = [parseFloat(buffer), y, z, t];
      return { ...state, ...extras, buffer, stack };
    }

    func = unaryFunctions[keyCode];
    if (func) {
      const [x, y, z, t] = state.stack;
      const stack = [check(func(x)), y, z, t];
      return { ...state, ...extras, stack };
    }

    func = binaryFunctions[keyCode];
    if (func) {
      const [x, y, z, t] = state.stack;
      const stack = [check(func(x, y)), z, t, t];
      return { ...state, ...extras, stack };
    }

    func = stackFunctions[keyCode];
    if (func) {
      const stack = func(state.stack);
      return { ...state, ...extras, stack };
    }

    throw new Error(`Not implemented: ${keyCode}`);
  } catch (error) {
    return { ...state, error, keyCode };
  }
}
