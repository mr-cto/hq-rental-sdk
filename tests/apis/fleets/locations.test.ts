import * as locationsAPI from '../../../src/apis/fleets/locations';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Locations API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listLocations', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 1, name: 'Main Branch', active: true }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await locationsAPI.listLocations();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/locations');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/fleets/locations').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listLocations).toBe('function');
    });
  });
});
