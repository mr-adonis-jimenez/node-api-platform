export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/src/__tests__/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/__tests__/**", "!src/index.js"],
  coverageDirectory: "coverage",
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
