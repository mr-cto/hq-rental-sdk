import * as vehicleModelsAPI from '../../../src/apis/fleets/vehicle-models';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Vehicle Models API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicleModels', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 1, name: 'Camry', brand: 'Toyota' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehicleModelsAPI.listVehicleModels();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/models');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getVehicleModel', () => {
    it('should call client.get with correct URL and model ID', async () => {
      const mockResponse = { id: 1, name: 'Camry', brand: 'Toyota' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehicleModelsAPI.getVehicleModel(1);

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/models/1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/vehicle-models').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listVehicleModels).toBe('function');
      expect(typeof defaultExport.getVehicleModel).toBe('function');
    });
  });
});
