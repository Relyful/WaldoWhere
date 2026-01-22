const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "/node_modules/(?!@prisma)" // Allow transformation of Prisma if needed
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};