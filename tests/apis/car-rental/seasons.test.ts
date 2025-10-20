import * as seasonsAPI from '../../../src/apis/car-rental/seasons';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Seasons API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listSeasons', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'season-1', name: 'Summer 2024' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await seasonsAPI.listSeasons();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/seasons');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createSeason', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'season-1', name: 'Summer 2024' } as any;
      const payload = { name: 'Summer 2024', start_date: '2024-06-01' };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await seasonsAPI.createSeason(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/seasons', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('getSeason', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 'season-1', name: 'Summer 2024' } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await seasonsAPI.getSeason('season-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/seasons/season-1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateSeason', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'season-1', name: 'Updated Season' } as any;
      const payload = { name: 'Updated Season' };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await seasonsAPI.updateSeason('season-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith('/car-rental/seasons/season-1', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteSeason', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await seasonsAPI.deleteSeason('season-1');

      expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/seasons/season-1');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/seasons').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listSeasons).toBe('function');
      expect(typeof defaultExport.createSeason).toBe('function');
      expect(typeof defaultExport.getSeason).toBe('function');
      expect(typeof defaultExport.updateSeason).toBe('function');
      expect(typeof defaultExport.deleteSeason).toBe('function');
    });
  });
});