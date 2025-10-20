import filtersAPI, { getFilterExamples } from '../../src/apis/filters';
import type { FilterExample } from '../../src/apis/filters';

// Mock the client module
jest.mock('../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

import client from '../../src/client';
const mockClient = client as jest.Mocked<typeof client>;

describe('Filters API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilterExamples', () => {
    it('should call client.get with correct URL', async () => {
      const mockFilters: FilterExample[] = [
        {
          field: 'status',
          operators: ['eq', 'ne', 'in'],
          example_values: ['active', 'inactive', 'pending'],
          description: 'Filter by status',
        },
        {
          field: 'created_at',
          operators: ['gte', 'lte', 'between'],
          example_values: ['2024-01-01', '2024-12-31'],
          description: 'Filter by creation date',
        },
      ];
      mockClient.get.mockResolvedValue(mockFilters);

      const result = await getFilterExamples();

      expect(mockClient.get).toHaveBeenCalledWith('/filters');
      expect(result).toEqual(mockFilters);
    });

    it('should handle empty filter examples', async () => {
      const mockFilters: FilterExample[] = [];
      mockClient.get.mockResolvedValue(mockFilters);

      const result = await getFilterExamples();

      expect(mockClient.get).toHaveBeenCalledWith('/filters');
      expect(result).toEqual([]);
    });

    it('should handle filters with optional fields missing', async () => {
      const mockFilters: FilterExample[] = [
        {
          field: 'id',
          operators: ['eq'],
        },
        {
          field: 'name',
          operators: ['like', 'eq'],
          example_values: ['test', 'example'],
        },
      ];
      mockClient.get.mockResolvedValue(mockFilters);

      const result = await getFilterExamples();

      expect(result).toEqual(mockFilters);
    });

    it('should handle different value types', async () => {
      const mockFilters: FilterExample[] = [
        {
          field: 'active',
          operators: ['eq'],
          example_values: [true, false],
          description: 'Boolean filter',
        },
        {
          field: 'price',
          operators: ['gte', 'lte'],
          example_values: [10.99, 100.5],
          description: 'Numeric filter',
        },
        {
          field: 'category',
          operators: ['in'],
          example_values: ['cars', 'trucks', 'bikes'],
          description: 'String filter',
        },
      ];
      mockClient.get.mockResolvedValue(mockFilters);

      const result = await getFilterExamples();

      expect(result).toEqual(mockFilters);
    });
  });

  describe('default export', () => {
    it('should export getFilterExamples in default object', () => {
      expect(filtersAPI).toBeDefined();
      expect(filtersAPI.getFilterExamples).toBe(getFilterExamples);
    });

    it('should have getFilterExamples be the same as named export', () => {
      expect(filtersAPI.getFilterExamples).toBe(getFilterExamples);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from client.get', async () => {
      const error = new Error('Failed to fetch filters');
      mockClient.get.mockRejectedValue(error);

      await expect(getFilterExamples()).rejects.toThrow('Failed to fetch filters');
      expect(mockClient.get).toHaveBeenCalledWith('/filters');
    });

    it('should propagate API errors', async () => {
      const apiError = new Error('API Error: 404 Not Found');
      mockClient.get.mockRejectedValue(apiError);

      await expect(getFilterExamples()).rejects.toThrow('API Error: 404 Not Found');
    });
  });
});
