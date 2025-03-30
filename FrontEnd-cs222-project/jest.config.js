module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', 
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}', '!src/**/*.d.ts'],
    coverageDirectory: 'coverage',
  };
  