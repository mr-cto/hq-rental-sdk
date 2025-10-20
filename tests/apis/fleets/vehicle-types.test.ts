import * as vehicleTypesAPI from '../../../src/apis/fleets/vehicle-types';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Vehicle Types API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicleTypes', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 1, name: 'Sedan', category: 'Car' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehicleTypesAPI.listVehicleTypes();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/types');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getVehicleType', () => {
    it('should call client.get with correct URL and type ID', async () => {
      const mockResponse = { id: 1, name: 'Sedan', category: 'Car' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehicleTypesAPI.getVehicleType(1);

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/types/1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/vehicle-types').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listVehicleTypes).toBe('function');
      expect(typeof defaultExport.getVehicleType).toBe('function');
    });
  });
});