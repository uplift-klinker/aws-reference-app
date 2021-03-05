module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ['./test/setup-tests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
