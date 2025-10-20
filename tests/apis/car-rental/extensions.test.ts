import * as extensionsAPI from '../../../src/apis/car-rental/extensions';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Extensions API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listReservationExtensions', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'ext-1', reservation_id: 'res-1', additional_days: 2 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await extensionsAPI.listReservationExtensions('res-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservations/res-1/extensions');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createReservationExtension', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'ext-1', reservation_id: 'res-1', additional_days: 2 } as any;
      const payload = { additional_days: 2, new_end_date: '2024-01-15' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await extensionsAPI.createReservationExtension('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/extensions', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteReservationExtension', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await extensionsAPI.deleteReservationExtension('res-1', 'ext-1');

      expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/reservations/res-1/extensions/ext-1');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/extensions').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listReservationExtensions).toBe('function');
      expect(typeof defaultExport.createReservationExtension).toBe('function');
      expect(typeof defaultExport.deleteReservationExtension).toBe('function');
    });
  });
});