import * as blockedDaysAPI from '../../../src/apis/car-rental/blocked-days';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Blocked Days API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listBlockedDays', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockBlockedDays = [
        { id: '1', date: '2024-01-01', reason: 'Holiday', location_id: 'loc1' },
      ];
      mockClient.get.mockResolvedValue(mockBlockedDays);

      const result = await blockedDaysAPI.listBlockedDays();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/blocked-days');
      expect(result).toEqual(mockBlockedDays);
    });

    it('should call client.get with correct URL with params', async () => {
      const mockBlockedDays = [
        { id: '1', date: '2024-01-01', reason: 'Holiday', location_id: 'loc1' },
      ];
      const params = { location_id: 'loc1', date: '2024-01-01' };
      mockClient.get.mockResolvedValue(mockBlockedDays);

      const result = await blockedDaysAPI.listBlockedDays(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/blocked-days?location_id=loc1&date=2024-01-01',
      );
      expect(result).toEqual(mockBlockedDays);
    });

    it('should handle empty params object', async () => {
      const mockBlockedDays = [{ id: '1', date: '2024-01-01', reason: 'Holiday' }];
      mockClient.get.mockResolvedValue(mockBlockedDays);

      const result = await blockedDaysAPI.listBlockedDays({});

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/blocked-days?');
      expect(result).toEqual(mockBlockedDays);
    });

    it('should handle complex params with encoding', async () => {
      const mockBlockedDays = [{ id: '1', date: '2024-01-01', reason: 'Special Event' }];
      const params = { reason: 'Special Event', active: true };
      mockClient.get.mockResolvedValue(mockBlockedDays);

      const result = await blockedDaysAPI.listBlockedDays(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/blocked-days?reason=Special+Event&active=true',
      );
      expect(result).toEqual(mockBlockedDays);
    });
  });

  describe('default export', () => {
    it('should export listBlockedDays in default object', () => {
      expect(blockedDaysAPI.default).toHaveProperty('listBlockedDays');
    });

    it('should have listBlockedDays be the same as named export', () => {
      expect(blockedDaysAPI.default.listBlockedDays).toBe(blockedDaysAPI.listBlockedDays);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from client.get', async () => {
      const error = new Error('Network error');
      mockClient.get.mockRejectedValue(error);

      await expect(blockedDaysAPI.listBlockedDays()).rejects.toThrow('Network error');
    });

    it('should propagate errors from client.get with params', async () => {
      const error = new Error('Server error');
      mockClient.get.mockRejectedValue(error);

      await expect(blockedDaysAPI.listBlockedDays({ location_id: 'test' })).rejects.toThrow(
        'Server error',
      );
    });
  });
});
