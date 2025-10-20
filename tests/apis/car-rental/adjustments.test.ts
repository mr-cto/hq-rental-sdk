import * as adjustmentsAPI from '../../../src/apis/car-rental/adjustments';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Adjustments API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listReservationAdjustments', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'adj-1', reservation_id: 'res-1', amount: 100 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await adjustmentsAPI.listReservationAdjustments('res-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/adjustments');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createReservationAdjustment', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'adj-1', reservation_id: 'res-1', amount: 100 } as any;
      const payload = { amount: 100, description: 'Test adjustment', type: 'credit' as const };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await adjustmentsAPI.createReservationAdjustment('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/adjustments', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteReservationAdjustment', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await adjustmentsAPI.deleteReservationAdjustment('res-1', 'adj-1');

      expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/adjustments/adj-1');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/adjustments').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listReservationAdjustments).toBe('function');
      expect(typeof defaultExport.createReservationAdjustment).toBe('function');
      expect(typeof defaultExport.deleteReservationAdjustment).toBe('function');
    });
  });
});