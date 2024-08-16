export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['__testUtils__'],
  transformIgnorePatterns: [],
  maxConcurrency: 1,
  sandboxInjectedGlobals: ['Math'],
  reporters: ['default', 'jest-junit'],
};
