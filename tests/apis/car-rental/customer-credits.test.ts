import * as customerCreditsAPI from '../../../src/apis/car-rental/customer-credits';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Customer Credits API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listCustomerCredits', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'credit-1', customer_id: 'cust-1', amount: 100 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await customerCreditsAPI.listCustomerCredits('cust-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/customers/cust-1/credits');
      expect(result).toBe(mockResponse);
    });
  });

  describe('createCustomerCredit', () => {
    it('should call client.post with correct URL and payload', async () => {
      const mockResponse = { id: 'credit-1', customer_id: 'cust-1', amount: 100 } as any;
      const payload = { amount: 100, currency: 'USD', type: 'credit' as const };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await customerCreditsAPI.createCustomerCredit('cust-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/customers/cust-1/credits', payload);
      expect(result).toBe(mockResponse);
    });
  });

  describe('updateCustomerCredit', () => {
    it('should call client.put with correct URL and payload', async () => {
      const mockResponse = { id: 'credit-1', customer_id: 'cust-1', amount: 150 } as any;
      const payload = { amount: 150 };
      mockClient.put.mockResolvedValue(mockResponse);

      const result = await customerCreditsAPI.updateCustomerCredit('cust-1', 'credit-1', payload);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/car-rental/customers/cust-1/credits/credit-1',
        payload,
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('deleteCustomerCredit', () => {
    it('should call client.delete with correct URL', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await customerCreditsAPI.deleteCustomerCredit('cust-1', 'credit-1');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/car-rental/customers/cust-1/credits/credit-1',
      );
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/customer-credits').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listCustomerCredits).toBe('function');
      expect(typeof defaultExport.createCustomerCredit).toBe('function');
      expect(typeof defaultExport.updateCustomerCredit).toBe('function');
      expect(typeof defaultExport.deleteCustomerCredit).toBe('function');
    });
  });
});
