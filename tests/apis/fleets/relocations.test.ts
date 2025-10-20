import * as relocationsAPI from '../../../src/apis/fleets/relocations';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Relocations API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicleRelocations', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockResponse = [
        {
          id: 'relocation-1',
          vehicle_id: 'vehicle-1',
          from_location: 'NYC',
          to_location: 'LA',
          start_date: '2024-01-15',
          status: 'pending',
          created_at: '2024-01-01T00:00:00Z',
        },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await relocationsAPI.listVehicleRelocations();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/relocations');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with correct URL with params', async () => {
      const mockResponse = [{ id: 'relocation-1', vehicle_id: 'vehicle-1' }] as any[];
      const params = { vehicle_id: 'vehicle-1', status: 'pending' };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await relocationsAPI.listVehicleRelocations(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/fleets/relocations?vehicle_id=vehicle-1&status=pending',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('createVehicleRelocation', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'relocation-1', vehicle_id: 'vehicle-1' } as any;
      const payload = {
        vehicle_id: 'vehicle-1',
        from_location: 'NYC',
        to_location: 'LA',
        start_date: '2024-01-15',
        status: 'pending' as const,
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await relocationsAPI.createVehicleRelocation(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/fleets/relocations', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getVehicleRelocation', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 'relocation-1', vehicle_id: 'vehicle-1' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await relocationsAPI.getVehicleRelocation('relocation-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/relocations/relocation-1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateVehicleRelocation', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'relocation-1', status: 'completed' } as any;
      const payload = { status: 'completed' as const, end_date: '2024-01-20', mileage_end: 150 };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await relocationsAPI.updateVehicleRelocation('relocation-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/fleets/relocations/relocation-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('cancelVehicleRelocation', () => {
    it('should call client.put with correct URL', async () => {
      const mockResponse = { id: 'relocation-1', status: 'cancelled' } as any;
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await relocationsAPI.cancelVehicleRelocation('relocation-1');

      expect(mockClient.put).toHaveBeenCalledWith('/fleets/relocations/relocation-1/cancel');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/relocations').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listVehicleRelocations).toBe('function');
      expect(typeof defaultExport.createVehicleRelocation).toBe('function');
      expect(typeof defaultExport.getVehicleRelocation).toBe('function');
      expect(typeof defaultExport.updateVehicleRelocation).toBe('function');
      expect(typeof defaultExport.cancelVehicleRelocation).toBe('function');
    });
  });
});
