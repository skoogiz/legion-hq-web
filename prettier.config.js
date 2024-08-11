/** @type {import("prettier").Config} */
const config = {
  parser: "babel-flow",
  tabWidth: 2,
  trailingComma: "all",
  bracketSpacing: false,
  printWidth: 90,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      options: {
        parser: "babel-ts",
      },
    },
    {
      files: ["package.json", ".eslintrc", "babel.config.json", "*.json"],
      options: {
        tabWidth: 2,
        parser: "json-stringify",
      },
    },
    {
      files: ["*.md", "*.mdx"],
      options: {
        parser: "markdown",
      },
    },
    {
      files: ["*.css"],
      options: {
        parser: "css",
      },
    },
  ],
};
export default config;
