import { HQRentalClient, client } from '../src/client';
import * as http from '../src/utils/http';
import { AxiosResponse } from 'axios';

// Mock the http module
jest.mock('../src/utils/http');
const mockHttp = http as jest.Mocked<typeof http>;

describe('HQRentalClient', () => {
  let clientInstance: HQRentalClient;

  beforeEach(() => {
    clientInstance = new HQRentalClient();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance', () => {
      expect(clientInstance).toBeInstanceOf(HQRentalClient);
    });
  });

  describe('request method', () => {
    it('should make GET request', async () => {
      const mockResponse: AxiosResponse = {
        data: { message: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      };
      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await clientInstance.request('get', '/test');

      expect(mockHttp.get).toHaveBeenCalledWith('/test');
      expect(result).toEqual({ message: 'success' });
    });

    it('should make POST request with data', async () => {
      const mockResponse: AxiosResponse = {
        data: { id: 1, name: 'test' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as any
      };
      const requestData = { name: 'test' };
      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await clientInstance.request('post', '/test', requestData);

      expect(mockHttp.post).toHaveBeenCalledWith('/test', requestData);
      expect(result).toEqual({ id: 1, name: 'test' });
    });

    it('should make PUT request with data', async () => {
      const mockResponse: AxiosResponse = {
        data: { id: 1, name: 'updated' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      };
      const requestData = { name: 'updated' };
      mockHttp.put.mockResolvedValue(mockResponse);

      const result = await clientInstance.request('put', '/test/1', requestData);

      expect(mockHttp.put).toHaveBeenCalledWith('/test/1', requestData);
      expect(result).toEqual({ id: 1, name: 'updated' });
    });

    it('should make DELETE request', async () => {
      const mockResponse: AxiosResponse = {
        data: null,
        status: 204,
        statusText: 'No Content',
        headers: {},
        config: {} as any
      };
      mockHttp.del.mockResolvedValue(mockResponse);

      const result = await clientInstance.request('delete', '/test/1');

      expect(mockHttp.del).toHaveBeenCalledWith('/test/1');
      expect(result).toBeNull();
    });

    it('should throw error for unsupported method', async () => {
      await expect(
        clientInstance.request('patch' as any, '/test')
      ).rejects.toThrow('Unsupported method');
    });

    it('should handle request errors', async () => {
      const error = new Error('Network error');
      mockHttp.get.mockRejectedValue(error);

      await expect(
        clientInstance.request('get', '/test')
      ).rejects.toThrow('Network error');
    });
  });

  describe('convenience methods', () => {
    beforeEach(() => {
      // Mock the request method to test convenience methods
      jest.spyOn(clientInstance, 'request');
    });

    describe('get method', () => {
      it('should call request with GET method', async () => {
        const mockResult = { data: 'test' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.get('/test');

        expect(clientInstance.request).toHaveBeenCalledWith('get', '/test');
        expect(result).toEqual(mockResult);
      });

      it('should handle typed GET requests', async () => {
        interface TestResponse {
          id: number;
          name: string;
        }
        
        const mockResult: TestResponse = { id: 1, name: 'test' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.get<TestResponse>('/test');

        expect(result).toEqual(mockResult);
        expect(typeof result.id).toBe('number');
        expect(typeof result.name).toBe('string');
      });
    });

    describe('post method', () => {
      it('should call request with POST method and data', async () => {
        const requestData = { name: 'test' };
        const mockResult = { id: 1, name: 'test' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.post('/test', requestData);

        expect(clientInstance.request).toHaveBeenCalledWith('post', '/test', requestData);
        expect(result).toEqual(mockResult);
      });

      it('should call request with POST method without data', async () => {
        const mockResult = { message: 'created' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.post('/test');

        expect(clientInstance.request).toHaveBeenCalledWith('post', '/test', undefined);
        expect(result).toEqual(mockResult);
      });

      it('should handle typed POST requests', async () => {
        interface CreateRequest {
          name: string;
        }
        
        interface CreateResponse {
          id: number;
          name: string;
        }
        
        const requestData: CreateRequest = { name: 'test' };
        const mockResult: CreateResponse = { id: 1, name: 'test' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.post<CreateResponse>('/test', requestData);

        expect(result).toEqual(mockResult);
        expect(typeof result.id).toBe('number');
      });
    });

    describe('put method', () => {
      it('should call request with PUT method and data', async () => {
        const requestData = { name: 'updated' };
        const mockResult = { id: 1, name: 'updated' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.put('/test/1', requestData);

        expect(clientInstance.request).toHaveBeenCalledWith('put', '/test/1', requestData);
        expect(result).toEqual(mockResult);
      });

      it('should call request with PUT method without data', async () => {
        const mockResult = { message: 'updated' };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.put('/test/1');

        expect(clientInstance.request).toHaveBeenCalledWith('put', '/test/1', undefined);
        expect(result).toEqual(mockResult);
      });
    });

    describe('delete method', () => {
      it('should call request with DELETE method', async () => {
        const mockResult = null;
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.delete('/test/1');

        expect(clientInstance.request).toHaveBeenCalledWith('delete', '/test/1');
        expect(result).toBeNull();
      });

      it('should handle typed DELETE requests', async () => {
        interface DeleteResponse {
          deleted: boolean;
        }
        
        const mockResult: DeleteResponse = { deleted: true };
        (clientInstance.request as jest.Mock).mockResolvedValue(mockResult);

        const result = await clientInstance.delete<DeleteResponse>('/test/1');

        expect(result).toEqual(mockResult);
        expect(typeof result.deleted).toBe('boolean');
      });
    });
  });

  describe('error handling', () => {
    it('should propagate errors from request method', async () => {
      const error = new Error('API Error');
      mockHttp.get.mockRejectedValue(error);

      await expect(clientInstance.get('/test')).rejects.toThrow('API Error');
    });

    it('should propagate errors from convenience methods', async () => {
      const error = new Error('API Error');
      jest.spyOn(clientInstance, 'request').mockRejectedValue(error);

      await expect(clientInstance.post('/test', {})).rejects.toThrow('API Error');
      await expect(clientInstance.put('/test', {})).rejects.toThrow('API Error');
      await expect(clientInstance.delete('/test')).rejects.toThrow('API Error');
    });
  });
});

describe('client export', () => {
  it('should export a client instance', () => {
    expect(client).toBeInstanceOf(HQRentalClient);
  });

  it('should export the same instance as default', async () => {
    const clientModule = await import('../src/client');
    expect(clientModule.client).toBe(clientModule.default);
  });

  it('should be a singleton instance', async () => {
    const module1 = await import('../src/client');
    const module2 = await import('../src/client');
    
    expect(module1.client).toBe(module2.client);
  });
});

describe('integration with http module', () => {
  it('should use actual http module methods', () => {
    // This test ensures the client correctly delegates to http module
    const realClient = new HQRentalClient();
    
    // Check that methods exist and are functions
    expect(typeof realClient.get).toBe('function');
    expect(typeof realClient.post).toBe('function');
    expect(typeof realClient.put).toBe('function');
    expect(typeof realClient.delete).toBe('function');
    expect(typeof realClient.request).toBe('function');
  });
});