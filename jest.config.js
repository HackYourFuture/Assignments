export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['__testUtils__'],
  transformIgnorePatterns: [],
  maxConcurrency: 1,
  sandboxInjectedGlobals: ['Math'],
};
