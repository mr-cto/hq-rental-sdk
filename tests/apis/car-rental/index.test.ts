import * as carRentalIndex from '../../../src/apis/car-rental/index';

describe('Car Rental Index API', () => {
  describe('module exports', () => {
    it('should export addresses module', () => {
      expect(carRentalIndex.addresses).toBeDefined();
      expect(typeof carRentalIndex.addresses).toBe('object');
    });

    it('should export adjustments module', () => {
      expect(carRentalIndex.adjustments).toBeDefined();
      expect(typeof carRentalIndex.adjustments).toBe('object');
    });

    it('should export blockedDays module', () => {
      expect(carRentalIndex.blockedDays).toBeDefined();
      expect(typeof carRentalIndex.blockedDays).toBe('object');
    });

    it('should export comments module', () => {
      expect(carRentalIndex.comments).toBeDefined();
      expect(typeof carRentalIndex.comments).toBe('object');
    });

    it('should export currencies module', () => {
      expect(carRentalIndex.currencies).toBeDefined();
      expect(typeof carRentalIndex.currencies).toBe('object');
    });

    it('should export customerCredits module', () => {
      expect(carRentalIndex.customerCredits).toBeDefined();
      expect(typeof carRentalIndex.customerCredits).toBe('object');
    });

    it('should export dailyManifest module', () => {
      expect(carRentalIndex.dailyManifest).toBeDefined();
      expect(typeof carRentalIndex.dailyManifest).toBe('object');
    });

    it('should export emails module', () => {
      expect(carRentalIndex.emails).toBeDefined();
      expect(typeof carRentalIndex.emails).toBe('object');
    });

    it('should export extensions module', () => {
      expect(carRentalIndex.extensions).toBeDefined();
      expect(typeof carRentalIndex.extensions).toBe('object');
    });

    it('should export externalCharges module', () => {
      expect(carRentalIndex.externalCharges).toBeDefined();
      expect(typeof carRentalIndex.externalCharges).toBe('object');
    });

    it('should export fields module', () => {
      expect(carRentalIndex.fields).toBeDefined();
      expect(typeof carRentalIndex.fields).toBe('object');
    });

    it('should export financial module', () => {
      expect(carRentalIndex.financial).toBeDefined();
      expect(typeof carRentalIndex.financial).toBe('object');
    });

    it('should export payments module', () => {
      expect(carRentalIndex.payments).toBeDefined();
      expect(typeof carRentalIndex.payments).toBe('object');
    });

    it('should export pricing module', () => {
      expect(carRentalIndex.pricing).toBeDefined();
      expect(typeof carRentalIndex.pricing).toBe('object');
    });

    it('should export refunds module', () => {
      expect(carRentalIndex.refunds).toBeDefined();
      expect(typeof carRentalIndex.refunds).toBe('object');
    });

    it('should export reservationAgents module', () => {
      expect(carRentalIndex.reservationAgents).toBeDefined();
      expect(typeof carRentalIndex.reservationAgents).toBe('object');
    });

    it('should export reservationAttempts module', () => {
      expect(carRentalIndex.reservationAttempts).toBeDefined();
      expect(typeof carRentalIndex.reservationAttempts).toBe('object');
    });

    it('should export reservations module', () => {
      expect(carRentalIndex.reservations).toBeDefined();
      expect(typeof carRentalIndex.reservations).toBe('object');
    });

    it('should export seasons module', () => {
      expect(carRentalIndex.seasons).toBeDefined();
      expect(typeof carRentalIndex.seasons).toBe('object');
    });

    it('should export securityDeposits module', () => {
      expect(carRentalIndex.securityDeposits).toBeDefined();
      expect(typeof carRentalIndex.securityDeposits).toBe('object');
    });

    it('should export system module', () => {
      expect(carRentalIndex.system).toBeDefined();
      expect(typeof carRentalIndex.system).toBe('object');
    });

    it('should export vehicleReplacements module', () => {
      expect(carRentalIndex.vehicleReplacements).toBeDefined();
      expect(typeof carRentalIndex.vehicleReplacements).toBe('object');
    });

    it('should export webhooks module', () => {
      expect(carRentalIndex.webhooks).toBeDefined();
      expect(typeof carRentalIndex.webhooks).toBe('object');
    });
  });
});
