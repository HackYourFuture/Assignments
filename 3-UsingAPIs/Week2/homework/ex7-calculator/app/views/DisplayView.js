const format = (x) => {
  const absX = Math.abs(x);
  return (absX > 1e10 || absX < 1e-2) && x !== 0
    ? x.toExponential()
    : x.toString();
};

function DisplayView(dom) {
  return ({ stack, buffer }) => {
    const [x, y, z, t] = stack;
    dom.tRegister.textContent = format(t);
    dom.zRegister.textContent = format(z);
    dom.yRegister.textContent = format(y);
    dom.xRegister.textContent = buffer || format(x);
  };
}

export default DisplayView;
