/* eslint-disable no-undef */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "12",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@entities": "./src/entities",
          "@usecases": "./src/usecases",
          "@shared": "./src/shared",
        },
      },
    ],
    ["add-module-exports"],
  ],
  ignore: ["**/**/*.spec.ts", "**/**/*.test.ts"],
};
