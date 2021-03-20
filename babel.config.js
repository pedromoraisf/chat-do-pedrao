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
  plugins: [["module-resolver"], ["add-module-exports"]],
  ignore: ["**/**/*.spec.ts", "**/**/*.test.ts"],
};
