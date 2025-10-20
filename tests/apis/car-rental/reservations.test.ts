import * as reservationsAPI from '../../../src/apis/car-rental/reservations';
import type { Rental as ReservationType } from '../../../src/types';
import type { ReservationAttempt, Extension, ExternalCharge, Adjustment, Payment, Refund, VehicleReplacement, ReservationAgent } from '../../../src/apis/car-rental/reservations';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Reservations API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Core Reservations', () => {
    describe('listReservations', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockReservations: ReservationType[] = [
          {
            id: 'res-1',
            customerId: 'cust-1',
            vehicleId: 'veh-1',
            startDate: '2024-04-01',
            endDate: '2024-04-07',
            status: 'active'
          }
        ];
        mockClient.get.mockResolvedValue(mockReservations);

        const result = await reservationsAPI.listReservations();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations');
        expect(result).toEqual(mockReservations);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { status: 'active', customer_id: 'cust-1' };
        mockClient.get.mockResolvedValue([]);

        await reservationsAPI.listReservations(params);

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations?status=active&customer_id=cust-1');
      });

      it('should handle empty params object', async () => {
        mockClient.get.mockResolvedValue([]);

        await reservationsAPI.listReservations({});

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations?');
      });
    });

    describe('findReservation', () => {
      it('should call client.get with correct URL', async () => {
        const mockReservation: ReservationType = {
          id: 'res-1',
          customerId: 'cust-1',
          vehicleId: 'veh-1',
          startDate: '2024-04-01',
          endDate: '2024-04-07',
          status: 'active'
        };
        mockClient.get.mockResolvedValue(mockReservation);

        const result = await reservationsAPI.findReservation('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1');
        expect(result).toEqual(mockReservation);
      });

      it('should handle special characters in reservation ID', async () => {
        mockClient.get.mockResolvedValue({ id: 'res@special' });

        await reservationsAPI.findReservation('res@special');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res@special');
      });
    });

    describe('createReservation', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<ReservationType> = {
          customerId: 'cust-1',
          vehicleId: 'veh-1',
          startDate: '2024-04-01',
          endDate: '2024-04-07',
          status: 'active'
        };
        const mockReservation: ReservationType = {
          ...payload as ReservationType,
          id: 'res-new'
        };
        mockClient.post.mockResolvedValue(mockReservation);

        const result = await reservationsAPI.createReservation(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations', payload);
        expect(result).toEqual(mockReservation);
      });

      it('should handle minimal payload', async () => {
        const payload: Partial<ReservationType> = {
          customerId: 'cust-1',
          status: 'active'
        };
        mockClient.post.mockResolvedValue({ id: 'res-minimal', ...payload });

        await reservationsAPI.createReservation(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations', payload);
      });
    });

    describe('updateReservation', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<ReservationType> = {
          status: 'completed',
          endDate: '2024-04-10'
        };
        const mockReservation: ReservationType = {
          ...payload as ReservationType,
          id: 'res-1',
          customerId: 'cust-1',
          vehicleId: 'veh-1',
          startDate: '2024-04-01'
        };
        mockClient.put.mockResolvedValue(mockReservation);

        const result = await reservationsAPI.updateReservation('res-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1', payload);
        expect(result).toEqual(mockReservation);
      });
    });
  });

  describe('Status Management', () => {
    describe('setReservationOpen', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.setReservationOpen('res-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/open');
      });
    });

    describe('setReservationCancel', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.setReservationCancel('res-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/cancel');
      });
    });

    describe('setReservationPending', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.setReservationPending('res-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/pending');
      });
    });

    describe('setReservationQuote', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.setReservationQuote('res-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/quote');
      });
    });

    describe('setReservationNoShow', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.setReservationNoShow('res-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/no_show');
      });
    });
  });

  describe('Reservation Attempts', () => {
    describe('listReservationAttempts', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockAttempts: ReservationAttempt[] = [
          {
            id: 'attempt-1',
            email: 'test@example.com',
            attempted_at: '2024-01-01T10:00:00Z',
            status: 'completed'
          }
        ];
        mockClient.get.mockResolvedValue(mockAttempts);

        const result = await reservationsAPI.listReservationAttempts();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservation-attempts');
        expect(result).toEqual(mockAttempts);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { status: 'failed', limit: '10' };
        mockClient.get.mockResolvedValue([]);

        await reservationsAPI.listReservationAttempts(params);

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservation-attempts?status=failed&limit=10');
      });
    });

    describe('findReservationAttemptsByEmail', () => {
      it('should call client.get with correct URL', async () => {
        const mockAttempts: ReservationAttempt[] = [
          {
            id: 'attempt-1',
            email: 'test@example.com',
            attempted_at: '2024-01-01T10:00:00Z',
            status: 'pending'
          }
        ];
        mockClient.get.mockResolvedValue(mockAttempts);

        const result = await reservationsAPI.findReservationAttemptsByEmail('test@example.com');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservation-attempts?email=test@example.com');
        expect(result).toEqual(mockAttempts);
      });
    });
  });

  describe('Extensions', () => {
    describe('listReservationExtensions', () => {
      it('should call client.get with correct URL', async () => {
        const mockExtensions: Extension[] = [
          {
            id: 'ext-1',
            reservation_id: 'res-1',
            original_end_date: '2024-04-07',
            new_end_date: '2024-04-10',
            additional_days: 3,
            additional_cost: 150.00,
            created_at: '2024-04-01T10:00:00Z'
          }
        ];
        mockClient.get.mockResolvedValue(mockExtensions);

        const result = await reservationsAPI.listReservationExtensions('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/extensions');
        expect(result).toEqual(mockExtensions);
      });
    });

    describe('createReservationExtension', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Extension> = {
          new_end_date: '2024-04-10',
          additional_days: 3,
          additional_cost: 150.00
        };
        const mockExtension: Extension = {
          ...payload as Extension,
          id: 'ext-new',
          reservation_id: 'res-1',
          original_end_date: '2024-04-07',
          created_at: '2024-04-01T10:00:00Z'
        };
        mockClient.post.mockResolvedValue(mockExtension);

        const result = await reservationsAPI.createReservationExtension('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/extensions', payload);
        expect(result).toEqual(mockExtension);
      });
    });

    describe('deleteReservationExtension', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await reservationsAPI.deleteReservationExtension('res-1', 'ext-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/extensions/ext-1');
      });
    });
  });

  describe('External Charges', () => {
    describe('listExternalCharges', () => {
      it('should call client.get with correct URL', async () => {
        const mockCharges: ExternalCharge[] = [
          {
            id: 'charge-1',
            reservation_id: 'res-1',
            description: 'Toll fees',
            amount: 25.50,
            charge_date: '2024-04-05'
          }
        ];
        mockClient.get.mockResolvedValue(mockCharges);

        const result = await reservationsAPI.listExternalCharges('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/external-charges');
        expect(result).toEqual(mockCharges);
      });
    });

    describe('createExternalCharge', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<ExternalCharge> = {
          description: 'Parking fee',
          amount: 15.00,
          charge_date: '2024-04-03',
          category: 'parking'
        };
        const mockCharge: ExternalCharge = {
          ...payload as ExternalCharge,
          id: 'charge-new',
          reservation_id: 'res-1'
        };
        mockClient.post.mockResolvedValue(mockCharge);

        const result = await reservationsAPI.createExternalCharge('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/external-charges', payload);
        expect(result).toEqual(mockCharge);
      });
    });

    describe('deleteExternalCharge', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await reservationsAPI.deleteExternalCharge('res-1', 'charge-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/external-charges/charge-1');
      });
    });
  });

  describe('Adjustments', () => {
    describe('listReservationAdjustments', () => {
      it('should call client.get with correct URL', async () => {
        const mockAdjustments: Adjustment[] = [
          {
            id: 'adj-1',
            reservation_id: 'res-1',
            type: 'discount',
            description: 'Early bird discount',
            amount: -20.00,
            created_at: '2024-04-01T10:00:00Z'
          }
        ];
        mockClient.get.mockResolvedValue(mockAdjustments);

        const result = await reservationsAPI.listReservationAdjustments('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/adjustments');
        expect(result).toEqual(mockAdjustments);
      });
    });

    describe('createReservationAdjustment', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Adjustment> = {
          type: 'fee',
          description: 'Cleaning fee',
          amount: 50.00
        };
        const mockAdjustment: Adjustment = {
          ...payload as Adjustment,
          id: 'adj-new',
          reservation_id: 'res-1',
          created_at: '2024-04-01T10:00:00Z'
        };
        mockClient.post.mockResolvedValue(mockAdjustment);

        const result = await reservationsAPI.createReservationAdjustment('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/adjustments', payload);
        expect(result).toEqual(mockAdjustment);
      });
    });

    describe('deleteReservationAdjustment', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await reservationsAPI.deleteReservationAdjustment('res-1', 'adj-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/adjustments/adj-1');
      });
    });
  });

  describe('Payments', () => {
    describe('listReservationPayments', () => {
      it('should call client.get with correct URL', async () => {
        const mockPayments: Payment[] = [
          {
            id: 'pay-1',
            reservation_id: 'res-1',
            amount: 299.99,
            payment_method: 'credit_card',
            status: 'completed',
            payment_date: '2024-04-01'
          }
        ];
        mockClient.get.mockResolvedValue(mockPayments);

        const result = await reservationsAPI.listReservationPayments('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments');
        expect(result).toEqual(mockPayments);
      });
    });

    describe('createReservationPayment', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Payment> = {
          amount: 149.99,
          payment_method: 'debit_card',
          payment_date: '2024-04-01'
        };
        const mockPayment: Payment = {
          ...payload as Payment,
          id: 'pay-new',
          reservation_id: 'res-1',
          status: 'pending'
        };
        mockClient.post.mockResolvedValue(mockPayment);

        const result = await reservationsAPI.createReservationPayment('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments', payload);
        expect(result).toEqual(mockPayment);
      });
    });

    describe('updateReservationPayment', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<Payment> = {
          status: 'completed',
          transaction_id: 'txn-123'
        };
        mockClient.put.mockResolvedValue({ id: 'pay-1', ...payload });

        await reservationsAPI.updateReservationPayment('res-1', 'pay-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments/pay-1', payload);
      });
    });

    describe('refundSecurityDeposit', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { amount: 100.00, reason: 'Vehicle returned clean' };
        mockClient.post.mockResolvedValue({ success: true });

        const result = await reservationsAPI.refundSecurityDeposit('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments/refund-deposit', payload);
        expect(result).toEqual({ success: true });
      });
    });

    describe('chargeCustomerCard', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { amount: 75.00, description: 'Additional charges' };
        mockClient.post.mockResolvedValue({ success: true, transaction_id: 'txn-456' });

        const result = await reservationsAPI.chargeCustomerCard('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments/charge', payload);
        expect(result).toEqual({ success: true, transaction_id: 'txn-456' });
      });
    });
  });

  describe('Refunds', () => {
    describe('listReservationRefunds', () => {
      it('should call client.get with correct URL', async () => {
        const mockRefunds: Refund[] = [
          {
            id: 'ref-1',
            reservation_id: 'res-1',
            amount: 50.00,
            reason: 'Cancelled booking',
            status: 'processed',
            refund_date: '2024-04-02'
          }
        ];
        mockClient.get.mockResolvedValue(mockRefunds);

        const result = await reservationsAPI.listReservationRefunds('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds');
        expect(result).toEqual(mockRefunds);
      });
    });

    describe('createReservationRefund', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Refund> = {
          amount: 100.00,
          reason: 'Partial cancellation',
          status: 'pending'
        };
        const mockRefund: Refund = {
          ...payload as Refund,
          id: 'ref-new',
          reservation_id: 'res-1'
        };
        mockClient.post.mockResolvedValue(mockRefund);

        const result = await reservationsAPI.createReservationRefund('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds', payload);
        expect(result).toEqual(mockRefund);
      });
    });

    describe('updateReservationRefund', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<Refund> = {
          status: 'processed',
          processed_date: '2024-04-03'
        };
        mockClient.put.mockResolvedValue({ id: 'ref-1', ...payload });

        await reservationsAPI.updateReservationRefund('res-1', 'ref-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds/ref-1', payload);
      });
    });

    describe('deleteReservationRefund', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await reservationsAPI.deleteReservationRefund('res-1', 'ref-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds/ref-1');
      });
    });
  });

  describe('Vehicle Replacements', () => {
    describe('listVehicleReplacements', () => {
      it('should call client.get with correct URL', async () => {
        const mockReplacements: VehicleReplacement[] = [
          {
            id: 'repl-1',
            reservation_id: 'res-1',
            original_vehicle_id: 'veh-1',
            replacement_vehicle_id: 'veh-2',
            reason: 'Original vehicle unavailable',
            replaced_at: '2024-04-01T08:00:00Z'
          }
        ];
        mockClient.get.mockResolvedValue(mockReplacements);

        const result = await reservationsAPI.listVehicleReplacements('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/vehicle-replacements');
        expect(result).toEqual(mockReplacements);
      });
    });

    describe('createVehicleReplacement', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<VehicleReplacement> = {
          original_vehicle_id: 'veh-1',
          replacement_vehicle_id: 'veh-3',
          reason: 'Upgrade requested',
          additional_cost: 25.00
        };
        const mockReplacement: VehicleReplacement = {
          ...payload as VehicleReplacement,
          id: 'repl-new',
          reservation_id: 'res-1',
          replaced_at: '2024-04-01T12:00:00Z'
        };
        mockClient.post.mockResolvedValue(mockReplacement);

        const result = await reservationsAPI.createVehicleReplacement('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/vehicle-replacements', payload);
        expect(result).toEqual(mockReplacement);
      });
    });

    describe('updateVehicleReplacement', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<VehicleReplacement> = {
          additional_cost: 30.00
        };
        mockClient.put.mockResolvedValue({ id: 'repl-1', ...payload });

        await reservationsAPI.updateVehicleReplacement('res-1', 'repl-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1/vehicle-replacements/repl-1', payload);
      });
    });

    describe('deleteVehicleReplacement', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await reservationsAPI.deleteVehicleReplacement('res-1', 'repl-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/vehicle-replacements/repl-1');
      });
    });
  });

  describe('Reservation Agents', () => {
    describe('listReservationAgents', () => {
      it('should call client.get with correct URL', async () => {
        const mockAgents: ReservationAgent[] = [
          {
            id: 'agent-1',
            name: 'John Smith',
            email: 'john@example.com',
            role: 'both',
            location_id: 'loc-1'
          }
        ];
        mockClient.get.mockResolvedValue(mockAgents);

        const result = await reservationsAPI.listReservationAgents();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservation-agents');
        expect(result).toEqual(mockAgents);
      });
    });

    describe('assignPrimaryAgent', () => {
      it('should call client.post with correct URL and payload', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.assignPrimaryAgent('res-1', 'agent-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/agents/primary', { agent_id: 'agent-1' });
      });
    });

    describe('assignReturnAgent', () => {
      it('should call client.post with correct URL and payload', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.assignReturnAgent('res-1', 'agent-2');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/agents/return', { agent_id: 'agent-2' });
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/reservations').default;
      
      // Core Reservations
      expect(defaultExport.listReservations).toBeDefined();
      expect(defaultExport.findReservation).toBeDefined();
      expect(defaultExport.createReservation).toBeDefined();
      expect(defaultExport.updateReservation).toBeDefined();
      
      // Status Management
      expect(defaultExport.setReservationOpen).toBeDefined();
      expect(defaultExport.setReservationCancel).toBeDefined();
      expect(defaultExport.setReservationPending).toBeDefined();
      expect(defaultExport.setReservationQuote).toBeDefined();
      expect(defaultExport.setReservationNoShow).toBeDefined();
      
      // Reservation Attempts
      expect(defaultExport.listReservationAttempts).toBeDefined();
      expect(defaultExport.findReservationAttemptsByEmail).toBeDefined();
      
      // Extensions, External Charges, etc.
      expect(defaultExport.listReservationExtensions).toBeDefined();
      expect(defaultExport.createReservationExtension).toBeDefined();
      expect(defaultExport.deleteReservationExtension).toBeDefined();
      expect(defaultExport.listExternalCharges).toBeDefined();
      expect(defaultExport.createExternalCharge).toBeDefined();
      expect(defaultExport.deleteExternalCharge).toBeDefined();
    });

    it('should have all functions be the same as named exports', () => {
      const defaultExport = require('../../../src/apis/car-rental/reservations').default;
      
      expect(defaultExport.listReservations).toBe(reservationsAPI.listReservations);
      expect(defaultExport.findReservation).toBe(reservationsAPI.findReservation);
      expect(defaultExport.createReservation).toBe(reservationsAPI.createReservation);
      expect(defaultExport.updateReservation).toBe(reservationsAPI.updateReservation);
      
      expect(defaultExport.setReservationOpen).toBe(reservationsAPI.setReservationOpen);
      expect(defaultExport.setReservationCancel).toBe(reservationsAPI.setReservationCancel);
      expect(defaultExport.setReservationPending).toBe(reservationsAPI.setReservationPending);
      expect(defaultExport.setReservationQuote).toBe(reservationsAPI.setReservationQuote);
      expect(defaultExport.setReservationNoShow).toBe(reservationsAPI.setReservationNoShow);
    });
  });

  describe('Booking Flow Functions', () => {
    describe('getDatesStepValidations', () => {
      it('should call client.get with correct URL', async () => {
        const mockValidations = { required_fields: ['pickup_date', 'return_date'] };
        mockClient.get.mockResolvedValue(mockValidations);

        const result = await reservationsAPI.getDatesStepValidations();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/dates-step');
        expect(result).toEqual(mockValidations);
      });
    });

    describe('validateDatesAndGetClasses', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = {
          pickup_date: '2024-04-01',
          return_date: '2024-04-07',
          brand: 'Toyota',
          location: 'loc-1'
        };
        const mockClasses = [{ class: 'economy', price: 100 }];
        mockClient.post.mockResolvedValue(mockClasses);

        const result = await reservationsAPI.validateDatesAndGetClasses(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/validate-dates', payload);
        expect(result).toEqual(mockClasses);
      });

      it('should handle minimal payload', async () => {
        const payload = {
          pickup_date: '2024-04-01',
          return_date: '2024-04-07'
        };
        mockClient.post.mockResolvedValue([]);

        await reservationsAPI.validateDatesAndGetClasses(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/validate-dates', payload);
      });
    });

    describe('updateVehicleClass', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload = { vehicle_class: 'premium' };
        const mockReservation = { id: 'res-1', vehicle_class: 'premium' };
        mockClient.put.mockResolvedValue(mockReservation);

        const result = await reservationsAPI.updateVehicleClass('res-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1/vehicle-class', payload);
        expect(result).toEqual(mockReservation);
      });
    });

    describe('getAdditionalCharges', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = {
          pickup_date: '2024-04-01',
          return_date: '2024-04-07',
          brand: 'Toyota',
          vehicle_class: 'economy'
        };
        const mockCharges = [{ id: 'charge-1', name: 'GPS', price: 10 }];
        mockClient.post.mockResolvedValue(mockCharges);

        const result = await reservationsAPI.getAdditionalCharges(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/additional-charges', payload);
        expect(result).toEqual(mockCharges);
      });
    });

    describe('getPricing', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = {
          vehicle_class: 'economy',
          charges: [{ id: 'charge-1', quantity: 1 }],
          pickup_date: '2024-04-01',
          return_date: '2024-04-07'
        };
        const mockPricing = { subtotal: 100, taxes: 10, total: 110 };
        mockClient.post.mockResolvedValue(mockPricing);

        const result = await reservationsAPI.getPricing(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/pricing', payload);
        expect(result).toEqual(mockPricing);
      });
    });

    describe('createOrUpdateCustomer', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { name: 'John Doe', email: 'john@example.com' };
        const mockCustomer = { id: 'cust-1', ...payload };
        mockClient.post.mockResolvedValue(mockCustomer);

        const result = await reservationsAPI.createOrUpdateCustomer(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/customer', payload);
        expect(result).toEqual(mockCustomer);
      });
    });

    describe('confirmReservation', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { customer_id: 'cust-1', vehicle_class: 'economy' };
        const mockReservation = { id: 'res-1', status: 'confirmed', ...payload };
        mockClient.post.mockResolvedValue(mockReservation);

        const result = await reservationsAPI.confirmReservation(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/confirm', payload);
        expect(result).toEqual(mockReservation);
      });
    });
  });

  describe('Rental Agreement and Signing', () => {
    describe('getRentalAgreement', () => {
      it('should call client.get with correct URL', async () => {
        const mockAgreement = { agreement_text: 'Terms and conditions...', version: '1.0' };
        mockClient.get.mockResolvedValue(mockAgreement);

        const result = await reservationsAPI.getRentalAgreement('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/rental-agreement');
        expect(result).toEqual(mockAgreement);
      });
    });

    describe('setSignDate', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { sign_date: '2024-04-01T10:00:00Z' };
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.setSignDate('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/sign-date', payload);
      });
    });

    describe('uploadDriverSignature', () => {
      it('should call client.post with correct URL and signature string', async () => {
        const signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
        const mockResult = { signature_id: 'sig-1', uploaded: true };
        mockClient.post.mockResolvedValue(mockResult);

        const result = await reservationsAPI.uploadDriverSignature('res-1', signature);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/signature', { signature });
        expect(result).toEqual(mockResult);
      });

      it('should handle File object signature', async () => {
        const signature = new File(['signature'], 'signature.png', { type: 'image/png' });
        const mockResult = { signature_id: 'sig-1', uploaded: true };
        mockClient.post.mockResolvedValue(mockResult);

        const result = await reservationsAPI.uploadDriverSignature('res-1', signature);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/signature', { signature });
        expect(result).toEqual(mockResult);
      });
    });
  });

  describe('Vehicle Management', () => {
    describe('assignVehicle', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { vehicle_id: 'veh-1' };
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.assignVehicle('res-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/assign-vehicle', payload);
      });
    });

    describe('detachVehicle', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await reservationsAPI.detachVehicle('res-1');

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/detach-vehicle');
      });
    });

    describe('getAvailableVehicles', () => {
      it('should call client.get with correct URL', async () => {
        const mockVehicles = [
          { id: 'veh-1', make: 'Toyota', model: 'Camry', available: true },
          { id: 'veh-2', make: 'Honda', model: 'Accord', available: true }
        ];
        mockClient.get.mockResolvedValue(mockVehicles);

        const result = await reservationsAPI.getAvailableVehicles('res-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/available-vehicles');
        expect(result).toEqual(mockVehicles);
      });
    });
  });

  describe('error handling', () => {
    it('should propagate errors from core reservation operations', async () => {
      const error = new Error('Reservation operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);

      await expect(reservationsAPI.listReservations()).rejects.toThrow('Reservation operation failed');
      await expect(reservationsAPI.findReservation('res-1')).rejects.toThrow('Reservation operation failed');
      await expect(reservationsAPI.createReservation({})).rejects.toThrow('Reservation operation failed');
      await expect(reservationsAPI.updateReservation('res-1', {})).rejects.toThrow('Reservation operation failed');
    });

    it('should propagate errors from status management operations', async () => {
      const error = new Error('Status update failed');
      mockClient.post.mockRejectedValue(error);

      await expect(reservationsAPI.setReservationOpen('res-1')).rejects.toThrow('Status update failed');
      await expect(reservationsAPI.setReservationCancel('res-1')).rejects.toThrow('Status update failed');
      await expect(reservationsAPI.setReservationPending('res-1')).rejects.toThrow('Status update failed');
      await expect(reservationsAPI.setReservationQuote('res-1')).rejects.toThrow('Status update failed');
      await expect(reservationsAPI.setReservationNoShow('res-1')).rejects.toThrow('Status update failed');
    });

    it('should propagate errors from reservation attempts operations', async () => {
      const error = new Error('Reservation attempts operation failed');
      mockClient.get.mockRejectedValue(error);

      await expect(reservationsAPI.listReservationAttempts()).rejects.toThrow('Reservation attempts operation failed');
      await expect(reservationsAPI.findReservationAttemptsByEmail('test@example.com')).rejects.toThrow('Reservation attempts operation failed');
    });

    it('should propagate errors from extensions operations', async () => {
      const error = new Error('Extensions operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(reservationsAPI.listReservationExtensions('res-1')).rejects.toThrow('Extensions operation failed');
      await expect(reservationsAPI.createReservationExtension('res-1', {})).rejects.toThrow('Extensions operation failed');
      await expect(reservationsAPI.deleteReservationExtension('res-1', 'ext-1')).rejects.toThrow('Extensions operation failed');
    });

    it('should propagate errors from external charges operations', async () => {
      const error = new Error('External charges operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(reservationsAPI.listExternalCharges('res-1')).rejects.toThrow('External charges operation failed');
      await expect(reservationsAPI.createExternalCharge('res-1', {})).rejects.toThrow('External charges operation failed');
      await expect(reservationsAPI.deleteExternalCharge('res-1', 'charge-1')).rejects.toThrow('External charges operation failed');
    });
  });
});