module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
  };
  