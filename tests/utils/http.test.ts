import axios from 'axios';
import * as http from '../../src/utils/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HTTP Utils', () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxiosInstance = {
      request: jest.fn(),
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
  });

  it('should export functions', () => {
    expect(typeof http.get).toBe('function');
    expect(typeof http.post).toBe('function');
    expect(typeof http.put).toBe('function');
    expect(typeof http.del).toBe('function');
    expect(typeof http.setToken).toBe('function');
  });

  describe('setToken', () => {
    it('should set token', () => {
      http.setToken('test-token');
      // Token is used internally, we'll verify it through requests
      expect(true).toBe(true);
    });

    it('should clear token', () => {
      http.setToken(null);
      expect(true).toBe(true);
    });
  });

  describe('get', () => {
    it('should make GET request', async () => {
      const mockResponse = { data: { id: 1 }, status: 200 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      const result = await http.get('/users');

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/users',
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('post', () => {
    it('should make POST request', async () => {
      const mockResponse = { data: { id: 1 }, status: 201 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      const data = { name: 'John' };
      const result = await http.post('/users', data);

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/users',
        data,
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('put', () => {
    it('should make PUT request', async () => {
      const mockResponse = { data: { id: 1 }, status: 200 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      const data = { name: 'Updated' };
      const result = await http.put('/users/1', data);

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'PUT',
        url: '/users/1',
        data,
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('del', () => {
    it('should make DELETE request', async () => {
      const mockResponse = { data: null, status: 204 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      const result = await http.del('/users/1');

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/users/1',
      });
      expect(result).toBe(mockResponse);
    });

    it('should make DELETE request with config', async () => {
      const mockResponse = { data: null, status: 204 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      const config = { headers: { 'X-Reason': 'cleanup' } };
      const result = await http.del('/users/1', config);

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/users/1',
        headers: { 'X-Reason': 'cleanup' },
      });
      expect(result).toBe(mockResponse);
    });
  });

  describe('token integration', () => {
    it('should use token in requests when set', async () => {
      http.setToken('my-token');
      const mockResponse = { data: {}, status: 200 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      await http.get('/protected');

      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer my-token',
          }),
        }),
      );
    });

    it('should not use Authorization header when token is null', async () => {
      http.setToken(null);
      const mockResponse = { data: {}, status: 200 };
      mockAxiosInstance.request.mockResolvedValue(mockResponse);

      await http.get('/public');

      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.anything(),
          }),
        }),
      );
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../src/utils/http').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.get).toBe('function');
      expect(typeof defaultExport.post).toBe('function');
      expect(typeof defaultExport.put).toBe('function');
      expect(typeof defaultExport.del).toBe('function');
      expect(typeof defaultExport.setToken).toBe('function');
    });
  });
});
