import * as damagesAPI from '../../../src/apis/fleets/damages';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Damages API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicleDamages', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'damage-1', vehicle_id: 'vehicle-1' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await damagesAPI.listVehicleDamages('vehicle-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/vehicle-1/damages');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createVehicleDamage', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'damage-1', vehicle_id: 'vehicle-1' } as any;
      const payload = { description: 'Scratched bumper', severity: 'minor' as const, damage_type: 'scratch', location: 'front_bumper', repair_status: 'pending' as const, damage_date: '2024-01-15' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await damagesAPI.createVehicleDamage('vehicle-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/fleets/vehicles/vehicle-1/damages', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getVehicleDamage', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 'damage-1', vehicle_id: 'vehicle-1' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await damagesAPI.getVehicleDamage('vehicle-1', 'damage-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/vehicle-1/damages/damage-1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateVehicleDamage', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'damage-1', repair_status: 'completed' } as any;
      const payload = { repair_status: 'completed' as const, cost: 250 };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await damagesAPI.updateVehicleDamage('vehicle-1', 'damage-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/fleets/vehicles/vehicle-1/damages/damage-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/damages').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listVehicleDamages).toBe('function');
      expect(typeof defaultExport.createVehicleDamage).toBe('function');
      expect(typeof defaultExport.getVehicleDamage).toBe('function');
      expect(typeof defaultExport.updateVehicleDamage).toBe('function');
    });
  });
});