import { describe, it, expect, jest } from '@jest/globals';
import * as brands from '../../../src/apis/fleets/brands';
import client from '../../../src/client';

// Mock the client
jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Brands API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listVehicleBrands', () => {
    it('should call client.get with correct URL', async () => {
      mockClient.get.mockResolvedValue([]);

      await brands.listVehicleBrands();

      expect(mockClient.get).toHaveBeenCalledWith('/fleets/brands');
    });
  });

  describe('getVehicleBrand', () => {
    it('should call client.get with correct URL and brand ID', async () => {
      const brandId = 'brand-123';
      mockClient.get.mockResolvedValue({});

      await brands.getVehicleBrand(brandId);

      expect(mockClient.get).toHaveBeenCalledWith(`/fleets/brands/${brandId}`);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(brands.default).toHaveProperty('listVehicleBrands');
      expect(brands.default).toHaveProperty('getVehicleBrand');
    });
  });
});
