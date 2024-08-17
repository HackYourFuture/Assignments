export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['__testUtils__'],
  transformIgnorePatterns: [],
  sandboxInjectedGlobals: ['Math'],
  reporters: ['default', 'jest-junit'],
};
