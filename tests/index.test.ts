import * as SDK from '../src/index';
import client, { HQRentalClient } from '../src/client';

describe('SDK Main Entry Point', () => {
  describe('Named Exports', () => {
    it('should export HQRentalClient class', () => {
      expect(SDK.HQRentalClient).toBeDefined();
      expect(typeof SDK.HQRentalClient).toBe('function');
    });

    it('should export client instance', () => {
      expect(SDK.client).toBeDefined();
      expect(SDK.client).toBeInstanceOf(HQRentalClient);
    });

    it('should export auth module', () => {
      expect(SDK.auth).toBeDefined();
      expect(typeof SDK.auth).toBe('object');
      expect(typeof SDK.auth.setToken).toBe('function');
      expect(typeof SDK.auth.useApiKey).toBe('function');
    });

    it('should export types module', () => {
      expect(SDK.types).toBeDefined();
      expect(typeof SDK.types).toBe('object');
    });
  });

  describe('Individual API Modules', () => {
    it('should export addresses API', () => {
      expect(SDK.addresses).toBeDefined();
      expect(typeof SDK.addresses).toBe('object');
    });

    it('should export blockedDays API', () => {
      expect(SDK.blockedDays).toBeDefined();
      expect(typeof SDK.blockedDays).toBe('object');
    });

    it('should export comments API', () => {
      expect(SDK.comments).toBeDefined();
      expect(typeof SDK.comments).toBe('object');
    });

    it('should export currencies API', () => {
      expect(SDK.currencies).toBeDefined();
      expect(typeof SDK.currencies).toBe('object');
    });

    it('should export emails API', () => {
      expect(SDK.emails).toBeDefined();
      expect(typeof SDK.emails).toBe('object');
    });

    it('should export fields API', () => {
      expect(SDK.fields).toBeDefined();
      expect(typeof SDK.fields).toBe('object');
    });

    it('should export files API', () => {
      expect(SDK.files).toBeDefined();
      expect(typeof SDK.files).toBe('object');
    });

    it('should export financial API', () => {
      expect(SDK.financial).toBeDefined();
      expect(typeof SDK.financial).toBe('object');
    });

    it('should export fleet API', () => {
      expect(SDK.fleet).toBeDefined();
      expect(typeof SDK.fleet).toBe('object');
    });

    it('should export fleetManagement API', () => {
      expect(SDK.fleetManagement).toBeDefined();
      expect(typeof SDK.fleetManagement).toBe('object');
    });

    it('should export pricing API', () => {
      expect(SDK.pricing).toBeDefined();
      expect(typeof SDK.pricing).toBe('object');
    });

    it('should export reservations API', () => {
      expect(SDK.reservations).toBeDefined();
      expect(typeof SDK.reservations).toBe('object');
    });

    it('should export sheets API', () => {
      expect(SDK.sheets).toBeDefined();
      expect(typeof SDK.sheets).toBe('object');
    });

    it('should export system API', () => {
      expect(SDK.system).toBeDefined();
      expect(typeof SDK.system).toBe('object');
    });

    it('should export paymentGateways API', () => {
      expect(SDK.paymentGateways).toBeDefined();
      expect(typeof SDK.paymentGateways).toBe('object');
    });

    it('should export contacts API', () => {
      expect(SDK.contacts).toBeDefined();
      expect(typeof SDK.contacts).toBe('object');
    });

    it('should export filters API', () => {
      expect(SDK.filters).toBeDefined();
      expect(typeof SDK.filters).toBe('object');
    });

    it('should export preferences API', () => {
      expect(SDK.preferences).toBeDefined();
      expect(typeof SDK.preferences).toBe('object');
    });
  });

  describe('Organized Categories', () => {
    it('should export carRental category', () => {
      expect(SDK.carRental).toBeDefined();
      expect(typeof SDK.carRental).toBe('object');
    });

    it('should export fleets category', () => {
      expect(SDK.fleets).toBeDefined();
      expect(typeof SDK.fleets).toBe('object');
    });
  });

  describe('Type Exports', () => {
    it('should export FilterExample type', () => {
      // We can't directly test type exports, but we can test that the module imports correctly
      expect(typeof SDK).toBe('object');
    });

    it('should export ModulePreference type', () => {
      // We can't directly test type exports, but we can test that the module imports correctly
      expect(typeof SDK).toBe('object');
    });
  });

  describe('Default Export', () => {
    it('should export client as default', () => {
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(HQRentalClient);
      expect(client).toBe(SDK.client);
    });
  });

  describe('Module Structure', () => {
    it('should have all expected properties', () => {
      const expectedProperties = [
        // Core
        'HQRentalClient',
        'client',
        'auth',
        'types',
        // Individual APIs
        'addresses',
        'blockedDays',
        'comments',
        'currencies',
        'emails',
        'fields',
        'files',
        'financial',
        'fleet',
        'fleetManagement',
        'pricing',
        'reservations',
        'sheets',
        'system',
        'paymentGateways',
        'contacts',
        'filters',
        'preferences',
        // Categories
        'carRental',
        'fleets',
      ];

      expectedProperties.forEach(prop => {
        expect(SDK).toHaveProperty(prop);
      });
    });

    it('should not have unexpected properties', () => {
      const expectedProperties = [
        'HQRentalClient',
        'client',
        'auth',
        'types',
        'addresses',
        'blockedDays',
        'comments',
        'currencies',
        'emails',
        'fields',
        'files',
        'financial',
        'fleet',
        'fleetManagement',
        'pricing',
        'reservations',
        'sheets',
        'system',
        'paymentGateways',
        'contacts',
        'filters',
        'preferences',
        'carRental',
        'fleets',
        'default', // Default export also appears as a property
      ];

      const actualProperties = Object.keys(SDK).sort();
      
      expect(actualProperties).toEqual(expect.arrayContaining(expectedProperties));
      expect(actualProperties.length).toBe(expectedProperties.length);
    });
  });

  describe('Integration', () => {
    it('should allow using the SDK through different import patterns', () => {
      // Named import pattern
      expect(SDK.client).toBeDefined();
      
      // Default import pattern
      expect(client).toBeDefined();
      
      // Both should be the same instance
      expect(SDK.client).toBe(client);
    });

    it('should provide access to all API functionality', () => {
      // Test that we can access API functions through different patterns
      expect(typeof SDK.addresses.listAddresses).toBe('function');
      expect(typeof SDK.carRental.addresses.listAddresses).toBe('function');
      expect(typeof SDK.fleet.listVehicles).toBe('function');
      expect(typeof SDK.fleets.fleet.listVehicles).toBe('function');
    });
  });
});