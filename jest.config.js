/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transform: {
    "^.+\\.(ts|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.html$",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  testEnvironment: "jsdom",
};
