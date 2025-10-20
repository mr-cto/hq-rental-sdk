import * as telematicsAPI from '../../../src/apis/fleets/telematics';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Telematics API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listTelematicsData', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockResponse = [
        {
          id: 'data-1',
          vehicle_id: 'vehicle-1',
          timestamp: '2024-01-15T10:00:00Z',
          location: { latitude: 40.7128, longitude: -74.006 },
          created_at: '2024-01-01T00:00:00Z',
        },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.listTelematicsData('vehicle-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/vehicle-1/telematics');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with correct URL with params', async () => {
      const mockResponse = [
        { id: 'data-1', timestamp: '2024-01-15T10:00:00Z', speed: 60 },
      ] as any[];
      const params = { start_date: '2024-01-15', end_date: '2024-01-20', limit: 100 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.listTelematicsData('vehicle-1', params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/fleets/vehicles/vehicle-1/telematics?start_date=2024-01-15&end_date=2024-01-20&limit=100',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('getLatestTelematicsData', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = {
        id: 'data-1',
        vehicle_id: 'vehicle-1',
        timestamp: '2024-01-15T10:00:00Z',
        location: { latitude: 40.7128, longitude: -74.006 },
        created_at: '2024-01-01T00:00:00Z',
      } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.getLatestTelematicsData('vehicle-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/vehicle-1/telematics/latest');
      expect(result).toBe(mockResponse);
    });
  });

  describe('listTelematicsDevices', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [
        {
          id: 'device-1',
          vehicle_id: 'vehicle-1',
          device_id: 'dev-123',
          device_type: 'OBD',
          status: 'active',
          installed_date: '2024-01-01',
          created_at: '2024-01-01T00:00:00Z',
        },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.listTelematicsDevices();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/devices');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createTelematicsDevice', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'device-1', vehicle_id: 'vehicle-1' } as any;
      const payload = {
        vehicle_id: 'vehicle-1',
        device_id: 'dev-123',
        device_type: 'OBD',
        status: 'active' as const,
        installed_date: '2024-01-01',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.createTelematicsDevice(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/fleets/telematics/devices', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getTelematicsDevice', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 'device-1', vehicle_id: 'vehicle-1' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.getTelematicsDevice('device-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/devices/device-1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateTelematicsDevice', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'device-1', status: 'maintenance' } as any;
      const payload = { status: 'maintenance' as const, firmware_version: '2.1.0' };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await telematicsAPI.updateTelematicsDevice('device-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/fleets/telematics/devices/device-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteTelematicsDevice', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await telematicsAPI.deleteTelematicsDevice('device-1');

      expect(mockClient.delete).toHaveBeenCalledWith('/fleets/telematics/devices/device-1');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/telematics').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listTelematicsData).toBe('function');
      expect(typeof defaultExport.getLatestTelematicsData).toBe('function');
      expect(typeof defaultExport.listTelematicsDevices).toBe('function');
      expect(typeof defaultExport.createTelematicsDevice).toBe('function');
      expect(typeof defaultExport.getTelematicsDevice).toBe('function');
      expect(typeof defaultExport.updateTelematicsDevice).toBe('function');
      expect(typeof defaultExport.deleteTelematicsDevice).toBe('function');
    });
  });
});
