import * as dailyManifestAPI from '../../../src/apis/car-rental/daily-manifest';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Daily Manifest API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDailyManifest', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockResponse = { date: '2024-01-15', reservations: [], vehicles: [], summary: { total_reservations: 0, active_rentals: 0, pending_returns: 0, available_vehicles: 0 } } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await dailyManifestAPI.getDailyManifest();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/daily-manifest');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with correct URL and date param', async () => {
      const mockResponse = { date: '2024-01-15', reservations: [], vehicles: [], summary: { total_reservations: 0, active_rentals: 0, pending_returns: 0, available_vehicles: 0 } } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await dailyManifestAPI.getDailyManifest({ date: '2024-01-15' });

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/daily-manifest?date=2024-01-15');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with correct URL with date and location params', async () => {
      const mockResponse = { date: '2024-01-15', location: 'NYC', reservations: [], vehicles: [], summary: { total_reservations: 0, active_rentals: 0, pending_returns: 0, available_vehicles: 0 } } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await dailyManifestAPI.getDailyManifest({ date: '2024-01-15', location: 'NYC' });

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/daily-manifest?date=2024-01-15&location=NYC');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/daily-manifest').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.getDailyManifest).toBe('function');
    });
  });
});