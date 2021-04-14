export function check(result) {
  if (!Number.isFinite(result)) {
    throw new Error('Invalid result');
  }
  return result;
}

export default check;
