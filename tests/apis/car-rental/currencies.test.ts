import * as currenciesAPI from '../../../src/apis/car-rental/currencies';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Currencies API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listCurrencies', () => {
    it('should call client.get with correct URL', async () => {
      const mockCurrencies = [
        { id: '1', code: 'USD', name: 'US Dollar', symbol: '$', exchange_rate: 1.0 },
        { id: '2', code: 'EUR', name: 'Euro', symbol: '€', exchange_rate: 0.85 }
      ];
      mockClient.get.mockResolvedValue(mockCurrencies);

      const result = await currenciesAPI.listCurrencies();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/currencies');
      expect(result).toEqual(mockCurrencies);
    });

    it('should handle empty response', async () => {
      const mockCurrencies: any[] = [];
      mockClient.get.mockResolvedValue(mockCurrencies);

      const result = await currenciesAPI.listCurrencies();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/currencies');
      expect(result).toEqual(mockCurrencies);
    });

    it('should handle response with optional fields missing', async () => {
      const mockCurrencies = [
        { id: '1', code: 'USD', name: 'US Dollar', symbol: '$' },
        { id: '2', code: 'EUR', name: 'Euro', symbol: '€' }
      ];
      mockClient.get.mockResolvedValue(mockCurrencies);

      const result = await currenciesAPI.listCurrencies();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/currencies');
      expect(result).toEqual(mockCurrencies);
    });
  });

  describe('default export', () => {
    it('should export listCurrencies in default object', () => {
      expect(currenciesAPI.default).toHaveProperty('listCurrencies');
    });

    it('should have listCurrencies be the same as named export', () => {
      expect(currenciesAPI.default.listCurrencies).toBe(currenciesAPI.listCurrencies);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from client.get', async () => {
      const error = new Error('Network error');
      mockClient.get.mockRejectedValue(error);

      await expect(currenciesAPI.listCurrencies()).rejects.toThrow('Network error');
    });

    it('should propagate API errors', async () => {
      const error = new Error('API rate limit exceeded');
      mockClient.get.mockRejectedValue(error);

      await expect(currenciesAPI.listCurrencies()).rejects.toThrow('API rate limit exceeded');
    });
  });
});