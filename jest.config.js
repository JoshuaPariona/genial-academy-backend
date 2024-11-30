/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "docs/reports/coverage",
  //roots: ["<rootDir>/src/test"],
  //moduleNameMapper: {
  //  "^@main/(.*)$": "<rootDir>/src/main/$1",
  //},
  //moduleFileExtensions: ["ts", "js", "json", "node"],

  //testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  //collectCoverage: true,
  //collectCoverageFrom: ["src/main/**/*.{ts,js}", "!src/main/**/*.d.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};