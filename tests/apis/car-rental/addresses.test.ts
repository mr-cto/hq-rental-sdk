import * as addressesAPI from '../../../src/apis/car-rental/addresses';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Addresses API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listAddresses', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockAddresses = [{ id: '1', street: '123 Main St', city: 'Test City', country: 'US' }];
      mockClient.get.mockResolvedValue(mockAddresses);

      const result = await addressesAPI.listAddresses();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/addresses');
      expect(result).toEqual(mockAddresses);
    });

    it('should call client.get with correct URL with params', async () => {
      const mockAddresses = [{ id: '1', street: '123 Main St', city: 'Test City', country: 'US' }];
      const params = { limit: 10, offset: 0 };
      mockClient.get.mockResolvedValue(mockAddresses);

      const result = await addressesAPI.listAddresses(params);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/addresses?limit=10&offset=0');
      expect(result).toEqual(mockAddresses);
    });

    it('should handle empty params object', async () => {
      const mockAddresses = [{ id: '1', street: '123 Main St', city: 'Test City', country: 'US' }];
      mockClient.get.mockResolvedValue(mockAddresses);

      const result = await addressesAPI.listAddresses({});

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/addresses?');
      expect(result).toEqual(mockAddresses);
    });

    it('should handle complex params', async () => {
      const mockAddresses = [{ id: '1', street: '123 Main St', city: 'Test City', country: 'US' }];
      const params = { city: 'Test City', country: 'US', active: true };
      mockClient.get.mockResolvedValue(mockAddresses);

      const result = await addressesAPI.listAddresses(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/addresses?city=Test+City&country=US&active=true',
      );
      expect(result).toEqual(mockAddresses);
    });
  });

  describe('createAddress', () => {
    it('should call client.post with correct URL and payload', async () => {
      const payload = { street: '123 New St', city: 'New City', country: 'US' };
      const mockAddress = { id: '2', ...payload };
      mockClient.post.mockResolvedValue(mockAddress);

      const result = await addressesAPI.createAddress(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/addresses', payload);
      expect(result).toEqual(mockAddress);
    });

    it('should handle empty payload', async () => {
      const payload = {};
      const mockAddress = { id: '3', street: '', city: '', country: '' };
      mockClient.post.mockResolvedValue(mockAddress);

      const result = await addressesAPI.createAddress(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/addresses', payload);
      expect(result).toEqual(mockAddress);
    });

    it('should handle partial payload', async () => {
      const payload = { street: '456 Partial St' };
      const mockAddress = {
        id: '4',
        street: '456 Partial St',
        city: 'Default City',
        country: 'US',
      };
      mockClient.post.mockResolvedValue(mockAddress);

      const result = await addressesAPI.createAddress(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/addresses', payload);
      expect(result).toEqual(mockAddress);
    });
  });

  describe('getAddress', () => {
    it('should call client.get with correct URL', async () => {
      const addressId = 'addr-123';
      const mockAddress = { id: addressId, street: '789 Get St', city: 'Get City', country: 'US' };
      mockClient.get.mockResolvedValue(mockAddress);

      const result = await addressesAPI.getAddress(addressId);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/addresses/addr-123');
      expect(result).toEqual(mockAddress);
    });

    it('should handle special characters in addressId', async () => {
      const addressId = 'addr-with-special/chars%20test';
      const mockAddress = {
        id: addressId,
        street: '789 Special St',
        city: 'Special City',
        country: 'US',
      };
      mockClient.get.mockResolvedValue(mockAddress);

      const result = await addressesAPI.getAddress(addressId);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/addresses/addr-with-special/chars%20test',
      );
      expect(result).toEqual(mockAddress);
    });
  });

  describe('updateAddress', () => {
    it('should call client.put with correct URL and payload', async () => {
      const addressId = 'addr-456';
      const payload = { street: '999 Updated St', city: 'Updated City' };
      const mockAddress = { id: addressId, ...payload, country: 'US' };
      mockClient.put.mockResolvedValue(mockAddress);

      const result = await addressesAPI.updateAddress(addressId, payload);

      expect(mockClient.put).toHaveBeenCalledWith('/car-rental/addresses/addr-456', payload);
      expect(result).toEqual(mockAddress);
    });

    it('should handle empty payload', async () => {
      const addressId = 'addr-789';
      const payload = {};
      const mockAddress = {
        id: addressId,
        street: 'Original St',
        city: 'Original City',
        country: 'US',
      };
      mockClient.put.mockResolvedValue(mockAddress);

      const result = await addressesAPI.updateAddress(addressId, payload);

      expect(mockClient.put).toHaveBeenCalledWith('/car-rental/addresses/addr-789', payload);
      expect(result).toEqual(mockAddress);
    });

    it('should handle partial payload update', async () => {
      const addressId = 'addr-partial';
      const payload = { postal_code: '12345' };
      const mockAddress = {
        id: addressId,
        street: 'Original St',
        city: 'Original City',
        country: 'US',
        postal_code: '12345',
      };
      mockClient.put.mockResolvedValue(mockAddress);

      const result = await addressesAPI.updateAddress(addressId, payload);

      expect(mockClient.put).toHaveBeenCalledWith('/car-rental/addresses/addr-partial', payload);
      expect(result).toEqual(mockAddress);
    });
  });

  describe('deleteAddress', () => {
    it('should call client.delete with correct URL', async () => {
      const addressId = 'addr-delete';
      mockClient.delete.mockResolvedValue(undefined);

      const result = await addressesAPI.deleteAddress(addressId);

      expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/addresses/addr-delete');
      expect(result).toBeUndefined();
    });

    it('should handle special characters in addressId', async () => {
      const addressId = 'addr-delete/special%20chars';
      mockClient.delete.mockResolvedValue(undefined);

      const result = await addressesAPI.deleteAddress(addressId);

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/car-rental/addresses/addr-delete/special%20chars',
      );
      expect(result).toBeUndefined();
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(addressesAPI.default).toHaveProperty('listAddresses');
      expect(addressesAPI.default).toHaveProperty('createAddress');
      expect(addressesAPI.default).toHaveProperty('getAddress');
      expect(addressesAPI.default).toHaveProperty('updateAddress');
      expect(addressesAPI.default).toHaveProperty('deleteAddress');
    });

    it('should have all functions be the same as named exports', () => {
      expect(addressesAPI.default.listAddresses).toBe(addressesAPI.listAddresses);
      expect(addressesAPI.default.createAddress).toBe(addressesAPI.createAddress);
      expect(addressesAPI.default.getAddress).toBe(addressesAPI.getAddress);
      expect(addressesAPI.default.updateAddress).toBe(addressesAPI.updateAddress);
      expect(addressesAPI.default.deleteAddress).toBe(addressesAPI.deleteAddress);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from client.get', async () => {
      const error = new Error('Network error');
      mockClient.get.mockRejectedValue(error);

      await expect(addressesAPI.listAddresses()).rejects.toThrow('Network error');
    });

    it('should propagate errors from client.post', async () => {
      const error = new Error('Creation error');
      mockClient.post.mockRejectedValue(error);

      await expect(addressesAPI.createAddress({})).rejects.toThrow('Creation error');
    });

    it('should propagate errors from client.put', async () => {
      const error = new Error('Update error');
      mockClient.put.mockRejectedValue(error);

      await expect(addressesAPI.updateAddress('id', {})).rejects.toThrow('Update error');
    });

    it('should propagate errors from client.delete', async () => {
      const error = new Error('Delete error');
      mockClient.delete.mockRejectedValue(error);

      await expect(addressesAPI.deleteAddress('id')).rejects.toThrow('Delete error');
    });
  });
});
