export default {
  collectCoverageFrom: ['**/src/**/*.js', '!**/node_modules/**'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
  modulePathIgnorePatterns: ['dist'],
  transform: {}
}
