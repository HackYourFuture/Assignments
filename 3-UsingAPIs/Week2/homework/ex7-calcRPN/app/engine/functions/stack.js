export default {
  swap: ([x, y, ...rest]) => [y, x, ...rest],
  dup: ([x, y, z]) => [x, x, y, z],
  enter: ([x, y, z]) => [x, x, y, z],
  rollDown: ([x, y, z, t]) => [y, z, t, x],
  noop: (stack) => stack,
};
