import * as featuresAPI from '../../../src/apis/fleets/features';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Features API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listFeatures', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 1, name: 'Bluetooth', active: true }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await featuresAPI.listFeatures();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/features');
      expect(result).toBe(mockResponse);
    });
  });

  describe('getFeature', () => {
    it('should call client.get with correct URL and feature ID', async () => {
      const mockResponse = { id: 1, name: 'Bluetooth', active: true } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await featuresAPI.getFeature(1);

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/features/1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/features').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listFeatures).toBe('function');
      expect(typeof defaultExport.getFeature).toBe('function');
    });
  });
});