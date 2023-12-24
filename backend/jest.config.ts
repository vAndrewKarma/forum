/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  setupFilesAfterEnv: ['./tests/setup.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'tests',
  },
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
}
