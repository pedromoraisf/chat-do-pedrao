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
    "@test/(.*)": "<rootDir>/test/$1",
    "@data/(.*)": "<rootDir>/src/data/$1",
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@infra/(.*)": "<rootDir>/src/infra/$1",
    "@main/(.*)": "<rootDir>/src/main/$1",
    "@presentation/(.*)": "<rootDir>/src/presentation/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
