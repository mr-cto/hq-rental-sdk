import * as vehiclesAPI from '../../../src/apis/fleets/vehicles';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Vehicles API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicles', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 1, license_plate: 'ABC123', make: 'Toyota', model: 'Camry', status: 'available' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehiclesAPI.listVehicles();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getVehicle', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 1, license_plate: 'ABC123', make: 'Toyota', model: 'Camry', status: 'available' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehiclesAPI.getVehicle(1);

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateVehicle', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 1, status: 'available' } as any;
      const payload = { status: 'available', mileage: 25000 };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await vehiclesAPI.updateVehicle(1, payload);

      expect(mockClient.put).toHaveBeenCalledWith('/fleets/vehicles/1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('reserveVehicle', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 1, reservation_id: 'res-123' } as any;
      const payload = { reservation_id: 'res-123', start_date: '2024-01-15', end_date: '2024-01-20' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await vehiclesAPI.reserveVehicle(1, payload);

      expect(mockClient.post).toHaveBeenCalledWith('/fleets/vehicles/1/reserve', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('cancelVehicleReserve', () => {
    it('should call client.delete with correct URL', async () => {
      const mockResponse = { id: 1, status: 'available' } as any;
      mockClient.delete.mockResolvedValue(mockResponse);

      const result = await vehiclesAPI.cancelVehicleReserve(1);

      expect(mockClient.delete).toHaveBeenCalledWith('/fleets/vehicles/1/reserve');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getVehicleMaintenanceHistory', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 1, vehicle_id: 1, type: 'oil_change', date: '2024-01-15' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await vehiclesAPI.getVehicleMaintenanceHistory(1);

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/1/maintenance');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/vehicles').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listVehicles).toBe('function');
      expect(typeof defaultExport.getVehicle).toBe('function');
      expect(typeof defaultExport.updateVehicle).toBe('function');
      expect(typeof defaultExport.reserveVehicle).toBe('function');
      expect(typeof defaultExport.cancelVehicleReserve).toBe('function');
      expect(typeof defaultExport.getVehicleMaintenanceHistory).toBe('function');
    });
  });
});