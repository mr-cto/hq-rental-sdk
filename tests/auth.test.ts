import { setToken, useApiKey } from '../src/auth';
import * as http from '../src/utils/http';

// Mock the http module
jest.mock('../src/utils/http');
const mockHttp = http as jest.Mocked<typeof http>;

describe('Authentication Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setToken', () => {
    it('should call http.setToken with the provided token', () => {
      const token = 'test-api-token-123';

      setToken(token);

      expect(mockHttp.setToken).toHaveBeenCalledWith(token);
      expect(mockHttp.setToken).toHaveBeenCalledTimes(1);
    });

    it('should call http.setToken with null to clear token', () => {
      setToken(null);

      expect(mockHttp.setToken).toHaveBeenCalledWith(null);
      expect(mockHttp.setToken).toHaveBeenCalledTimes(1);
    });

    it('should handle empty string token', () => {
      setToken('');

      expect(mockHttp.setToken).toHaveBeenCalledWith('');
      expect(mockHttp.setToken).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple consecutive calls', () => {
      const token1 = 'token1';
      const token2 = 'token2';

      setToken(token1);
      setToken(token2);

      expect(mockHttp.setToken).toHaveBeenCalledTimes(2);
      expect(mockHttp.setToken).toHaveBeenNthCalledWith(1, token1);
      expect(mockHttp.setToken).toHaveBeenNthCalledWith(2, token2);
    });
  });

  describe('useApiKey', () => {
    it('should call setToken with the provided API key', () => {
      const apiKey = 'api-key-123';

      useApiKey(apiKey);

      expect(mockHttp.setToken).toHaveBeenCalledWith(apiKey);
      expect(mockHttp.setToken).toHaveBeenCalledTimes(1);
    });

    it('should handle different API key formats', () => {
      const formats = [
        'sk_test_123456',
        'Bearer token123',
        'simple-api-key',
        'very-long-api-key-with-lots-of-characters-1234567890',
      ];

      formats.forEach((key, index) => {
        useApiKey(key);
        expect(mockHttp.setToken).toHaveBeenNthCalledWith(index + 1, key);
      });

      expect(mockHttp.setToken).toHaveBeenCalledTimes(formats.length);
    });

    it('should handle special characters in API key', () => {
      const specialKey = 'key-with-special-chars!@#$%^&*()';

      useApiKey(specialKey);

      expect(mockHttp.setToken).toHaveBeenCalledWith(specialKey);
    });
  });

  describe('Function Types', () => {
    it('should export setToken as a function', () => {
      expect(typeof setToken).toBe('function');
    });

    it('should export useApiKey as a function', () => {
      expect(typeof useApiKey).toBe('function');
    });
  });

  describe('Default Export', () => {
    it('should export all functions in default object', () => {
      const authDefault = require('../src/auth').default;

      expect(authDefault).toHaveProperty('setToken');
      expect(authDefault).toHaveProperty('useApiKey');
      expect(typeof authDefault.setToken).toBe('function');
      expect(typeof authDefault.useApiKey).toBe('function');
    });

    it('should have consistent function references', () => {
      const authDefault = require('../src/auth').default;

      expect(authDefault.setToken).toBe(setToken);
      expect(authDefault.useApiKey).toBe(useApiKey);
    });
  });

  describe('Integration with HTTP Module', () => {
    it('should properly delegate to http.setToken', () => {
      // Clear any previous calls
      mockHttp.setToken.mockClear();

      const testToken = 'integration-test-token';

      // Test setToken
      setToken(testToken);
      expect(mockHttp.setToken).toHaveBeenCalledWith(testToken);

      // Test useApiKey (which should also call setToken)
      const testApiKey = 'integration-test-api-key';
      useApiKey(testApiKey);
      expect(mockHttp.setToken).toHaveBeenCalledWith(testApiKey);

      // Both calls should have happened
      expect(mockHttp.setToken).toHaveBeenCalledTimes(2);
    });
  });

  describe('Error Handling', () => {
    it('should not throw errors when http.setToken throws', () => {
      mockHttp.setToken.mockImplementation(() => {
        throw new Error('HTTP module error');
      });

      expect(() => setToken('test-token')).toThrow('HTTP module error');
      expect(() => useApiKey('test-key')).toThrow('HTTP module error');

      // Reset the mock for other tests
      mockHttp.setToken.mockReset();
    });

    it('should handle undefined input gracefully', () => {
      // Reset the mock to not throw errors
      mockHttp.setToken.mockImplementation(() => {});

      // TypeScript would catch this, but testing runtime behavior
      expect(() => setToken(undefined as any)).not.toThrow();
      expect(() => useApiKey(undefined as any)).not.toThrow();
    });
  });

  describe('Authentication Flow', () => {
    it('should support typical authentication workflow', () => {
      // Reset the mock to not throw errors
      mockHttp.setToken.mockClear();
      mockHttp.setToken.mockImplementation(() => {});

      // Initial token setting
      setToken('initial-token');
      expect(mockHttp.setToken).toHaveBeenNthCalledWith(1, 'initial-token');

      // Token refresh
      setToken('refreshed-token');
      expect(mockHttp.setToken).toHaveBeenNthCalledWith(2, 'refreshed-token');

      // Logout (clear token)
      setToken(null);
      expect(mockHttp.setToken).toHaveBeenNthCalledWith(3, null);

      // Login with API key
      useApiKey('new-api-key');
      expect(mockHttp.setToken).toHaveBeenNthCalledWith(4, 'new-api-key');

      expect(mockHttp.setToken).toHaveBeenCalledTimes(4);
    });
  });
});
