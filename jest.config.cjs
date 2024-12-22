const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to the Next.js application
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', // Simulates a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Specifies setup file
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transforms modern JavaScript and TypeScript
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mocks CSS/SCSS imports
    '^@/components/(.*)$': '<rootDir>/components/$1', // Maps module aliases
  },
  collectCoverage: true, // Collect code coverage
  coverageDirectory: 'coverage', // Directory for coverage reports
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Include source files
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
    '!src/index.{js,jsx,ts,tsx}', // Exclude entry files
  ],
  resetMocks: true, // Automatically reset mocks after each test
  clearMocks: true, // Clear mock usage data after each test
};

module.exports = createJestConfig(customJestConfig);
