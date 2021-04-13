export const MAX_SIGNIFICANT_DIGITS = 14;

const splitNumber = (buffer) => {
  const matches = buffer.match(/^(-?[.0-9]+)(?:e([+-][0-9]+))?$/);
  if (!matches) {
    return [buffer, ''];
  }
  const [, significand, exponent = ''] = matches;
  return [significand, exponent];
};

const joinNumber = (significand, exponent) =>
  significand + (exponent ? `e${exponent}` : '');

const digit = (char) => (buffer) => {
  let [significand, exponent] = splitNumber(buffer || '0');

  if (exponent) {
    if (exponent === '+0') {
      exponent = `+${char}`;
    } else if (exponent === '-0') {
      exponent = `-${char}`;
    } else if (/^[+-]\d{1,2}$/.test(exponent)) {
      exponent += char;
    }
  } else {
    if (significand === '0') {
      significand = char;
    } else if (significand === '-0') {
      significand = `-${char}`;
    } else {
      significand += char;
    }
    const maxMantissaLength =
      MAX_SIGNIFICANT_DIGITS +
      (significand.startsWith('-') ? 1 : 0) +
      (significand.includes('.') ? 1 : 0);
    significand = significand.slice(0, maxMantissaLength);
  }

  return joinNumber(significand, exponent);
};

// TODO: remove i@

const decimal = (buffer) => {
  const matches = (buffer || '0').match(/^(.*[i@])?(.*)?$/);

  // Do nothing  (return early if the buffer already contains a decimal or an exponent
  if (matches && /[e.]/.test(matches[2])) {
    return buffer;
  }

  return `${buffer}.`;
};

const enterExponent = (buffer) => {
  const [significand, exponent] = splitNumber(buffer);
  return joinNumber(significand || '1', exponent || '+0');
};

const changeSign = (buffer) => {
  if (buffer === '') {
    return buffer;
  }
  let [significand, exponent] = splitNumber(buffer);
  if (exponent) {
    const sign = exponent.startsWith('-') ? '+' : '-';
    exponent = sign + exponent.slice(1);
  } else {
    significand = significand.startsWith('-')
      ? significand.slice(1)
      : '-'.concat(significand);
  }
  return joinNumber(significand, exponent);
};

export default {
  0: digit('0'),
  1: digit('1'),
  2: digit('2'),
  3: digit('3'),
  4: digit('4'),
  5: digit('5'),
  6: digit('6'),
  7: digit('7'),
  8: digit('8'),
  9: digit('9'),
  '.': decimal,
  chs: changeSign,
  eex: enterExponent,
};
