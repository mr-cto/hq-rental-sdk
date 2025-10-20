// Global test setup
import 'jest';

// Setup global test environment
beforeEach(() => {
  // Clear any environment variables
  delete process.env.HQ_API_TOKEN;
  delete process.env.HQ_API_BASE_URL;
  
  // Reset all mocks
  jest.clearAllMocks();
});

// Mock console methods for cleaner test output
const globalConsole = global.console;
global.console = {
  ...globalConsole,
  // Keep console.error and console.warn for debugging
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
};

// Add custom matchers if needed
expect.extend({
  toBeFunction(received: any) {
    const pass = typeof received === 'function';
    if (pass) {
      return {
        message: () => `expected ${received} not to be a function`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a function`,
        pass: false,
      };
    }
  },
});

// Declare custom matcher types
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeFunction(): R;
    }
  }
}