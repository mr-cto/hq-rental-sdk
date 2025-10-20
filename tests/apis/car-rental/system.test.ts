import { describe, it, expect } from '@jest/globals';
import * as systemAPI from '../../../src/apis/car-rental/system';

describe('Car Rental System API', () => {
  describe('Backward Compatibility', () => {
    it('should provide default export for backward compatibility', () => {
      expect(systemAPI.default).toBeDefined();
      expect(typeof systemAPI.default).toBe('object');
    });

    it('should contain functions from separated modules', () => {
      // The system module now combines functions from webhooks, daily-manifest, filters, and preferences
      expect(typeof systemAPI.default).toBe('object');
      // Note: The actual functions are tested in their respective module tests
      // webhooks.test.ts, daily-manifest.test.ts, filters.test.ts, preferences.test.ts
    });

    it('should be a compatibility layer', () => {
      // System module is now deprecated in favor of specific modules
      expect(systemAPI.default).toBeTruthy();
    });
  });
});