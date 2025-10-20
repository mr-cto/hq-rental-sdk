import * as paymentsAPI from '../../../src/apis/car-rental/payments';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Payments API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listReservationPayments', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'payment-1', reservation_id: 'res-1', amount: 100 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await paymentsAPI.listReservationPayments('res-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createReservationPayment', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'payment-1', reservation_id: 'res-1', amount: 100 } as any;
      const payload = { amount: 100, method: 'credit_card' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await paymentsAPI.createReservationPayment('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateReservationPayment', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'payment-1', reservation_id: 'res-1', amount: 150 } as any;
      const payload = { amount: 150 };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await paymentsAPI.updateReservationPayment('res-1', 'payment-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1/payments/payment-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('refundSecurityDeposit', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'refund-1' } as any;
      const payload = { amount: 200 };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await paymentsAPI.refundSecurityDeposit('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/refund-security-deposit', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('chargeCustomerCard', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'charge-1' } as any;
      const payload = { amount: 75 };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await paymentsAPI.chargeCustomerCard('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/charge-card', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/payments').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listReservationPayments).toBe('function');
      expect(typeof defaultExport.createReservationPayment).toBe('function');
      expect(typeof defaultExport.updateReservationPayment).toBe('function');
      expect(typeof defaultExport.refundSecurityDeposit).toBe('function');
      expect(typeof defaultExport.chargeCustomerCard).toBe('function');
    });
  });
});