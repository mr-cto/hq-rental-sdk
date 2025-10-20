import * as refundsAPI from '../../../src/apis/car-rental/refunds';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Refunds API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listReservationRefunds', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'refund-1', reservation_id: 'res-1', amount: 50 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await refundsAPI.listReservationRefunds('res-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createReservationRefund', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'refund-1', reservation_id: 'res-1', amount: 50 } as any;
      const payload = { amount: 50, reason: 'cancellation' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await refundsAPI.createReservationRefund('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateReservationRefund', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'refund-1', reservation_id: 'res-1', amount: 75 } as any;
      const payload = { amount: 75 };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await refundsAPI.updateReservationRefund('res-1', 'refund-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds/refund-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteReservationRefund', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await refundsAPI.deleteReservationRefund('res-1', 'refund-1');

      expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/refunds/refund-1');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/refunds').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listReservationRefunds).toBe('function');
      expect(typeof defaultExport.createReservationRefund).toBe('function');
      expect(typeof defaultExport.updateReservationRefund).toBe('function');
      expect(typeof defaultExport.deleteReservationRefund).toBe('function');
    });
  });
});