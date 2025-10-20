import * as vehicleReplacementsAPI from '../../../src/apis/car-rental/vehicle-replacements';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Vehicle Replacements API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicleReplacements', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'replacement-1', reservation_id: 'res-1' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehicleReplacementsAPI.listVehicleReplacements('res-1');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/vehicle-replacements',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('createVehicleReplacement', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'replacement-1', reservation_id: 'res-1' } as any;
      const payload = { replacement_vehicle_id: 'vehicle-123', reason: 'upgrade' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await vehicleReplacementsAPI.createVehicleReplacement('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/vehicle-replacements',
        payload,
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateVehicleReplacement', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'replacement-1', notes: 'Updated notes' } as any;
      const payload = { notes: 'Updated notes' };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await vehicleReplacementsAPI.updateVehicleReplacement(
        'res-1',
        'replacement-1',
        payload,
      );

      expect(mockClient.put).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/vehicle-replacements/replacement-1',
        payload,
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteVehicleReplacement', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await vehicleReplacementsAPI.deleteVehicleReplacement('res-1', 'replacement-1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/car-rental/reservations/res-1/vehicle-replacements/replacement-1',
      );
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/vehicle-replacements').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listVehicleReplacements).toBe('function');
      expect(typeof defaultExport.createVehicleReplacement).toBe('function');
      expect(typeof defaultExport.updateVehicleReplacement).toBe('function');
      expect(typeof defaultExport.deleteVehicleReplacement).toBe('function');
    });
  });
});
