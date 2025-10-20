import * as additionalChargesAPI from '../../../src/apis/fleets/additional-charges';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Additional Charges API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listAdditionalCharges', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [
        { id: 1, name: 'GPS Fee', amount: 10, type: 'daily', active: true },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await additionalChargesAPI.listAdditionalCharges();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/additional-charges');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getAdditionalCharge', () => {
    it('should call client.get with correct URL and charge ID', async () => {
      const mockResponse = {
        id: 1,
        name: 'GPS Fee',
        amount: 10,
        type: 'daily',
        active: true,
      } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await additionalChargesAPI.getAdditionalCharge(1);

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/additional-charges/1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/additional-charges').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listAdditionalCharges).toBe('function');
      expect(typeof defaultExport.getAdditionalCharge).toBe('function');
    });
  });
});
