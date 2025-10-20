import { Rental, RentalModel } from '../../src/models/rental';

describe('Rental Models', () => {
  describe('Rental Interface', () => {
    it('should define the correct interface structure', () => {
      const rental: Rental = {
        id: '1',
        customerId: 'customer-1',
        vehicleId: 'vehicle-1',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-07'),
        totalAmount: 350.00
      };

      expect(rental.id).toBe('1');
      expect(rental.customerId).toBe('customer-1');
      expect(rental.vehicleId).toBe('vehicle-1');
      expect(rental.startDate).toEqual(new Date('2024-01-01'));
      expect(rental.endDate).toEqual(new Date('2024-01-07'));
      expect(rental.totalAmount).toBe(350.00);
    });

    it('should handle different date formats', () => {
      const rental: Rental = {
        id: '2',
        customerId: 'customer-2',
        vehicleId: 'vehicle-2',
        startDate: new Date('2024-06-15T10:00:00Z'),
        endDate: new Date('2024-06-20T18:00:00Z'),
        totalAmount: 500.00
      };

      expect(rental.startDate.getFullYear()).toBe(2024);
      expect(rental.startDate.getMonth()).toBe(5); // June = 5 (0-indexed)
      expect(rental.endDate.getDate()).toBe(20);
    });
  });

  describe('RentalModel Class', () => {
    describe('constructor', () => {
      it('should create instance with all properties', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');
        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 350.00);

        expect(rental.id).toBe('1');
        expect(rental.customerId).toBe('customer-1');
        expect(rental.vehicleId).toBe('vehicle-1');
        expect(rental.startDate).toBe(startDate);
        expect(rental.endDate).toBe(endDate);
        expect(rental.totalAmount).toBe(350.00);
      });

      it('should handle different ID formats', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');
        
        const rental1 = new RentalModel('rental-123', 'customer-456', 'vehicle-789', startDate, endDate, 100.00);
        const rental2 = new RentalModel('1', '2', '3', startDate, endDate, 200.00);
        const rental3 = new RentalModel('uuid-1234-5678', 'cust_abc', 'veh_xyz', startDate, endDate, 300.00);

        expect(rental1.id).toBe('rental-123');
        expect(rental2.customerId).toBe('2');
        expect(rental3.vehicleId).toBe('veh_xyz');
      });

      it('should handle zero and negative amounts', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');

        const rental1 = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 0);
        const rental2 = new RentalModel('2', 'customer-2', 'vehicle-2', startDate, endDate, -50.00);

        expect(rental1.totalAmount).toBe(0);
        expect(rental2.totalAmount).toBe(-50.00);
      });

      it('should handle decimal amounts correctly', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');

        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 123.456);
        expect(rental.totalAmount).toBe(123.456);
      });
    });

    describe('validate method', () => {
      it('should return true for valid rental', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');
        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 350.00);

        expect(rental.validate()).toBe(true);
      });

      it('should validate different rental configurations', () => {
        const configurations = [
          {
            id: 'short-rental',
            customerId: 'customer-1',
            vehicleId: 'vehicle-1',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-01'), // Same day
            totalAmount: 50.00
          },
          {
            id: 'long-rental',
            customerId: 'customer-2',
            vehicleId: 'vehicle-2',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'), // Full year
            totalAmount: 10000.00
          },
          {
            id: 'minimal-rental',
            customerId: '1',
            vehicleId: '1',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-02'),
            totalAmount: 1.00
          }
        ];

        configurations.forEach(config => {
          const rental = new RentalModel(
            config.id,
            config.customerId,
            config.vehicleId,
            config.startDate,
            config.endDate,
            config.totalAmount
          );
          expect(rental.validate()).toBe(true);
        });
      });

      it('should handle edge cases in validation', () => {
        // Future dates
        const futureStart = new Date('2030-01-01');
        const futureEnd = new Date('2030-01-07');
        const futureRental = new RentalModel('1', 'customer-1', 'vehicle-1', futureStart, futureEnd, 350.00);
        expect(futureRental.validate()).toBe(true);

        // Past dates
        const pastStart = new Date('2020-01-01');
        const pastEnd = new Date('2020-01-07');
        const pastRental = new RentalModel('2', 'customer-2', 'vehicle-2', pastStart, pastEnd, 350.00);
        expect(pastRental.validate()).toBe(true);

        // Large amounts
        const largeAmountRental = new RentalModel('3', 'customer-3', 'vehicle-3', pastStart, pastEnd, 999999.99);
        expect(largeAmountRental.validate()).toBe(true);
      });
    });

    describe('Property Updates', () => {
      it('should allow property updates', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');
        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 350.00);

        // Update properties
        rental.id = 'updated-id';
        rental.customerId = 'new-customer';
        rental.vehicleId = 'new-vehicle';
        rental.totalAmount = 400.00;

        const newStartDate = new Date('2024-02-01');
        const newEndDate = new Date('2024-02-07');
        rental.startDate = newStartDate;
        rental.endDate = newEndDate;

        expect(rental.id).toBe('updated-id');
        expect(rental.customerId).toBe('new-customer');
        expect(rental.vehicleId).toBe('new-vehicle');
        expect(rental.totalAmount).toBe(400.00);
        expect(rental.startDate).toBe(newStartDate);
        expect(rental.endDate).toBe(newEndDate);
      });

      it('should maintain validation after updates', () => {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-07');
        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 350.00);

        expect(rental.validate()).toBe(true);

        rental.totalAmount = 0;
        expect(rental.validate()).toBe(true);

        rental.startDate = new Date('2025-01-01');
        rental.endDate = new Date('2025-01-07');
        expect(rental.validate()).toBe(true);
      });
    });

    describe('Date Handling', () => {
      it('should handle various date formats', () => {
        const dates = [
          new Date('2024-01-01T00:00:00Z'),
          new Date('2024-01-01T23:59:59Z'),
          new Date('2024-12-31'),
          new Date(2024, 0, 1), // January 1, 2024
          new Date(Date.now() + 86400000) // Tomorrow
        ];

        dates.forEach((date, index) => {
          const rental = new RentalModel(`rental-${index}`, 'customer-1', 'vehicle-1', date, date, 100.00);
          expect(rental.startDate).toBe(date);
          expect(rental.endDate).toBe(date);
        });
      });

      it('should handle start date after end date', () => {
        const startDate = new Date('2024-01-07');
        const endDate = new Date('2024-01-01'); // Earlier than start
        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', startDate, endDate, 350.00);

        expect(rental.startDate).toBe(startDate);
        expect(rental.endDate).toBe(endDate);
        // Note: The current validate method doesn't check date logic
        expect(rental.validate()).toBe(true);
      });
    });

    describe('Multiple Instances', () => {
      it('should handle multiple instances independently', () => {
        const rental1 = new RentalModel('1', 'customer-1', 'vehicle-1', new Date('2024-01-01'), new Date('2024-01-07'), 350.00);
        const rental2 = new RentalModel('2', 'customer-2', 'vehicle-2', new Date('2024-02-01'), new Date('2024-02-07'), 400.00);

        rental1.totalAmount = 500.00;
        rental2.totalAmount = 600.00;

        expect(rental1.totalAmount).toBe(500.00);
        expect(rental2.totalAmount).toBe(600.00);
        expect(rental1.id).not.toBe(rental2.id);
        expect(rental1.customerId).not.toBe(rental2.customerId);
      });
    });

    describe('Type Safety', () => {
      it('should maintain type safety for all properties', () => {
        const rental = new RentalModel('1', 'customer-1', 'vehicle-1', new Date('2024-01-01'), new Date('2024-01-07'), 350.00);

        expect(typeof rental.id).toBe('string');
        expect(typeof rental.customerId).toBe('string');
        expect(typeof rental.vehicleId).toBe('string');
        expect(rental.startDate).toBeInstanceOf(Date);
        expect(rental.endDate).toBeInstanceOf(Date);
        expect(typeof rental.totalAmount).toBe('number');
        expect(typeof rental.validate).toBe('function');
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty string IDs', () => {
      const rental = new RentalModel('', '', '', new Date(), new Date(), 0);
      expect(rental.id).toBe('');
      expect(rental.customerId).toBe('');
      expect(rental.vehicleId).toBe('');
    });

    it('should handle special characters in IDs', () => {
      const rental = new RentalModel('rental-123!@#$%', 'customer_456^&*()', 'vehicle+789=[]{}', new Date(), new Date(), 100);
      expect(rental.id).toBe('rental-123!@#$%');
      expect(rental.customerId).toBe('customer_456^&*()');
      expect(rental.vehicleId).toBe('vehicle+789=[]{}');
    });

    it('should handle extreme date values', () => {
      const minDate = new Date(-8640000000000000); // Min safe date
      const maxDate = new Date(8640000000000000);  // Max safe date
      
      const rental = new RentalModel('1', 'customer-1', 'vehicle-1', minDate, maxDate, 100);
      expect(rental.startDate).toBe(minDate);
      expect(rental.endDate).toBe(maxDate);
    });

    it('should handle very large amounts', () => {
      const largeAmount = Number.MAX_SAFE_INTEGER;
      const rental = new RentalModel('1', 'customer-1', 'vehicle-1', new Date(), new Date(), largeAmount);
      expect(rental.totalAmount).toBe(largeAmount);
    });
  });
});