import * as blockedPeriodsAPI from '../../../src/apis/fleets/blocked-periods';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Blocked Periods API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listBlockedPeriods', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockResponse = [
        {
          id: 'period-1',
          vehicle_id: 'vehicle-1',
          start_date: '2024-01-15',
          end_date: '2024-01-20',
          reason: 'maintenance',
          category: 'maintenance',
          created_by: 'user-1',
          created_at: '2024-01-01T00:00:00Z',
        },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await blockedPeriodsAPI.listBlockedPeriods();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/blocked-periods');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with correct URL with params', async () => {
      const mockResponse = [{ id: 'period-1', vehicle_id: 'vehicle-1' }] as any[];
      const params = { vehicle_id: 'vehicle-1', start_date: '2024-01-15' };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await blockedPeriodsAPI.listBlockedPeriods(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/fleets/blocked-periods?vehicle_id=vehicle-1&start_date=2024-01-15',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('createBlockedPeriod', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'period-1', start_date: '2024-01-15' } as any;
      const payload = {
        start_date: '2024-01-15',
        end_date: '2024-01-20',
        reason: 'maintenance',
        category: 'maintenance' as const,
        created_by: 'user-1',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await blockedPeriodsAPI.createBlockedPeriod(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/fleets/blocked-periods', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getBlockedPeriod', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 'period-1', start_date: '2024-01-15' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await blockedPeriodsAPI.getBlockedPeriod('period-1');

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/blocked-periods/period-1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateBlockedPeriod', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'period-1', end_date: '2024-01-25' } as any;
      const payload = { end_date: '2024-01-25' };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await blockedPeriodsAPI.updateBlockedPeriod('period-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/fleets/blocked-periods/period-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteBlockedPeriod', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await blockedPeriodsAPI.deleteBlockedPeriod('period-1');

      expect(mockClient.delete).toHaveBeenCalledWith('/fleets/blocked-periods/period-1');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/blocked-periods').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listBlockedPeriods).toBe('function');
      expect(typeof defaultExport.createBlockedPeriod).toBe('function');
      expect(typeof defaultExport.getBlockedPeriod).toBe('function');
      expect(typeof defaultExport.updateBlockedPeriod).toBe('function');
      expect(typeof defaultExport.deleteBlockedPeriod).toBe('function');
    });
  });
});
