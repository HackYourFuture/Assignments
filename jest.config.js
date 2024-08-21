export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(test).js'],
  modulePathIgnorePatterns: ['__testUtils__'],
  transformIgnorePatterns: [],
  sandboxInjectedGlobals: ['Math'],
};
