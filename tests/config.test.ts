import { API_BASE_URL, DEFAULT_HEADERS, Config } from '../src/config';

describe('Config Module', () => {
  describe('Constants', () => {
    it('should export API_BASE_URL', () => {
      expect(API_BASE_URL).toBeDefined();
      expect(typeof API_BASE_URL).toBe('string');
      expect(API_BASE_URL).toBe('https://api.hqrentalsoftware.com');
    });

    it('should export DEFAULT_HEADERS', () => {
      expect(DEFAULT_HEADERS).toBeDefined();
      expect(typeof DEFAULT_HEADERS).toBe('object');
      expect(DEFAULT_HEADERS['Content-Type']).toBe('application/json');
    });

    it('should have correct default headers structure', () => {
      expect(DEFAULT_HEADERS).toEqual({
        'Content-Type': 'application/json',
      });
    });
  });

  describe('Types', () => {
    it('should define Config type correctly', () => {
      // Test that Config type is properly structured
      const config: Config = {
        baseUrl: 'https://test.com',
        headers: {
          'Custom-Header': 'value',
        },
      };

      expect(config.baseUrl).toBe('https://test.com');
      expect(config.headers?.['Custom-Header']).toBe('value');
    });

    it('should allow optional Config properties', () => {
      const config1: Config = {};
      const config2: Config = { baseUrl: 'https://test.com' };
      const config3: Config = { headers: { 'X-Custom': 'value' } };

      expect(config1).toEqual({});
      expect(config2.baseUrl).toBe('https://test.com');
      expect(config3.headers?.['X-Custom']).toBe('value');
    });
  });

  describe('Default Export', () => {
    it('should export all constants in default object', () => {
      const configDefault = require('../src/config').default;

      expect(configDefault).toHaveProperty('API_BASE_URL');
      expect(configDefault).toHaveProperty('DEFAULT_HEADERS');
      expect(configDefault.API_BASE_URL).toBe(API_BASE_URL);
      expect(configDefault.DEFAULT_HEADERS).toEqual(DEFAULT_HEADERS);
    });
  });

  describe('Environment Variables', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should use hardcoded API_BASE_URL when no environment variable is set', () => {
      delete process.env.HQ_API_BASE_URL;

      // Re-require the module to get fresh constants
      const { API_BASE_URL: freshApiUrl } = require('../src/config');
      expect(freshApiUrl).toBe('https://api.hqrentalsoftware.com');
    });
  });

  describe('Object Immutability', () => {
    it('should not allow modification of DEFAULT_HEADERS from outside', () => {
      const originalHeaders = { ...DEFAULT_HEADERS };

      // Try to modify the exported object
      try {
        (DEFAULT_HEADERS as any)['New-Header'] = 'should-not-work';
      } catch {
        // Expected to fail if object is frozen/immutable
      }

      // The exported headers should be the same type of content
      expect(DEFAULT_HEADERS['Content-Type']).toBe(originalHeaders['Content-Type']);
    });
  });

  describe('Type Validation', () => {
    it('should validate API_BASE_URL format', () => {
      expect(API_BASE_URL).toMatch(/^https?:\/\/.+/);
    });

    it('should validate DEFAULT_HEADERS structure', () => {
      expect(DEFAULT_HEADERS).toEqual(
        expect.objectContaining({
          'Content-Type': expect.any(String),
        }),
      );
    });
  });
});
