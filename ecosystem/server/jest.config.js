/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const { resolve } = require("path");
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  collectCoverageFrom: ["./src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@entities/(.*)": "<rootDir>/src/entities/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
  },
};
