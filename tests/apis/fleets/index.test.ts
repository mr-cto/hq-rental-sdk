import * as fleetsIndex from '../../../src/apis/fleets/index';

describe('Fleets Index API', () => {
  describe('module exports', () => {
    it('should export fleet module', () => {
      expect(fleetsIndex.fleet).toBeDefined();
      expect(typeof fleetsIndex.fleet).toBe('object');
    });

    it('should export fleetManagement module', () => {
      expect(fleetsIndex.fleetManagement).toBeDefined();
      expect(typeof fleetsIndex.fleetManagement).toBe('object');
    });

    it('should export brands module', () => {
      expect(fleetsIndex.brands).toBeDefined();
      expect(typeof fleetsIndex.brands).toBe('object');
    });

    it('should export damages module', () => {
      expect(fleetsIndex.damages).toBeDefined();
      expect(typeof fleetsIndex.damages).toBe('object');
    });

    it('should export blockedPeriods module', () => {
      expect(fleetsIndex.blockedPeriods).toBeDefined();
      expect(typeof fleetsIndex.blockedPeriods).toBe('object');
    });

    it('should export relocations module', () => {
      expect(fleetsIndex.relocations).toBeDefined();
      expect(typeof fleetsIndex.relocations).toBe('object');
    });

    it('should export telematics module', () => {
      expect(fleetsIndex.telematics).toBeDefined();
      expect(typeof fleetsIndex.telematics).toBe('object');
    });

    it('should export additionalCharges module', () => {
      expect(fleetsIndex.additionalCharges).toBeDefined();
      expect(typeof fleetsIndex.additionalCharges).toBe('object');
    });

    it('should export features module', () => {
      expect(fleetsIndex.features).toBeDefined();
      expect(typeof fleetsIndex.features).toBe('object');
    });

    it('should export locations module', () => {
      expect(fleetsIndex.locations).toBeDefined();
      expect(typeof fleetsIndex.locations).toBe('object');
    });

    it('should export vehicleModels module', () => {
      expect(fleetsIndex.vehicleModels).toBeDefined();
      expect(typeof fleetsIndex.vehicleModels).toBe('object');
    });

    it('should export vehicleTypes module', () => {
      expect(fleetsIndex.vehicleTypes).toBeDefined();
      expect(typeof fleetsIndex.vehicleTypes).toBe('object');
    });

    it('should export vehicles module', () => {
      expect(fleetsIndex.vehicles).toBeDefined();
      expect(typeof fleetsIndex.vehicles).toBe('object');
    });
  });
});
