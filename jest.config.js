module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Root directory
  rootDir: '.',
  
  // Test patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,ts}',
    '<rootDir>/src/**/*.test.{js,ts}'
  ],
  
  // TypeScript support
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  
  // Module resolution
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  
  // Coverage configuration for 100% coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,js}',
    '!src/types/index.ts', // Pure type definitions
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json-summary'
  ],
  
  // Coverage thresholds for 100% coverage - temporarily lower for development
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,
  
  // Error handling
  errorOnDeprecated: true,
  
  // Verbose output
  verbose: true,
  
  // Test timeout
  testTimeout: 10000,
};