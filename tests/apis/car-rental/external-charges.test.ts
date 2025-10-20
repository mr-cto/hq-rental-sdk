import * as externalChargesAPI from '../../../src/apis/car-rental/external-charges';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('External Charges API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listExternalCharges', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'charge-1', reservation_id: 'res-1', amount: 50 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await externalChargesAPI.listExternalCharges('res-1');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/external-charges',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('createExternalCharge', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'charge-1', reservation_id: 'res-1', amount: 50 } as any;
      const payload = { amount: 50, description: 'Cleaning fee' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await externalChargesAPI.createExternalCharge('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/external-charges',
        payload,
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteExternalCharge', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await externalChargesAPI.deleteExternalCharge('res-1', 'charge-1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/external-charges/charge-1',
      );
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/external-charges').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listExternalCharges).toBe('function');
      expect(typeof defaultExport.createExternalCharge).toBe('function');
      expect(typeof defaultExport.deleteExternalCharge).toBe('function');
    });
  });
});
