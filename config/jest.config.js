const path = require("path");

const here = p => path.join(__dirname, p);

const ignores = [
  "/node_modules/",
  "/fixtures/",
  "/__tests__/helpers/",
  "__mocks__"
];

const jestConfig = {
  testURL: "http://localhost",
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "\\.(css)$": here("../src/object-proxy")
  },
  collectCoverageFrom: ["src/**/*.+(js|ts)"],
  testMatch: ["<rootDir>/**/__tests__/**/*.+(js|ts)"],
  testPathIgnorePatterns: ignores,
  coveragePathIgnorePatterns: ignores,
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  transform: { "^.+\\.js$": here("./babel-transform") },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};

module.exports = jestConfig;
