import * as financialAPI from '../../../src/apis/car-rental/financial';
import type {
  CustomerCredit,
  Fine,
  Package,
  PackageItem,
  Quote,
} from '../../../src/apis/car-rental/financial';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Financial API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Customer Credits', () => {
    describe('listCustomerCredits', () => {
      it('should call client.get with correct URL for customer credits', async () => {
        const mockCredits: CustomerCredit[] = [
          {
            id: 'credit-1',
            customer_id: 'cust-1',
            amount: 100.5,
            description: 'Refund for cancelled booking',
            transaction_type: 'credit',
            created_at: '2024-01-01T00:00:00Z',
            expires_at: '2024-12-31T23:59:59Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockCredits);

        const result = await financialAPI.listCustomerCredits('cust-1');

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/customer-credits?customer_id=cust-1',
        );
        expect(result).toEqual(mockCredits);
      });

      it('should handle special characters in customer ID', async () => {
        mockClient.get.mockResolvedValue([]);

        await financialAPI.listCustomerCredits('cust@123');

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/customer-credits?customer_id=cust@123',
        );
      });

      it('should handle empty credits list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await financialAPI.listCustomerCredits('cust-empty');

        expect(result).toEqual([]);
      });
    });

    describe('createCustomerCredit', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<CustomerCredit> = {
          customer_id: 'cust-1',
          amount: 50.0,
          transaction_type: 'credit',
          description: 'Loyalty bonus',
        };
        const mockCredit: CustomerCredit = {
          ...(payload as CustomerCredit),
          id: 'credit-new',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockCredit);

        const result = await financialAPI.createCustomerCredit(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/customer-credits', payload);
        expect(result).toEqual(mockCredit);
      });

      it('should handle minimal credit payload', async () => {
        const payload: Partial<CustomerCredit> = {
          customer_id: 'cust-1',
          amount: 25.0,
          transaction_type: 'debit',
        };
        mockClient.post.mockResolvedValue({ id: 'credit-minimal', ...payload });

        await financialAPI.createCustomerCredit(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/customer-credits', payload);
      });
    });

    describe('updateCustomerCredit', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<CustomerCredit> = {
          amount: 75.0,
          description: 'Updated amount',
        };
        const mockCredit: CustomerCredit = {
          id: 'credit-1',
          customer_id: 'cust-1',
          amount: 100.0,
          transaction_type: 'credit',
          created_at: '2024-01-01T00:00:00Z',
          ...payload,
        };
        mockClient.put.mockResolvedValue(mockCredit);

        const result = await financialAPI.updateCustomerCredit('credit-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith(
          '/car-rental/customer-credits/credit-1',
          payload,
        );
        expect(result).toEqual(mockCredit);
      });

      it('should handle empty update payload', async () => {
        mockClient.put.mockResolvedValue({ id: 'credit-1' });

        await financialAPI.updateCustomerCredit('credit-1', {});

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/customer-credits/credit-1', {});
      });
    });

    describe('deleteCustomerCredit', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await financialAPI.deleteCustomerCredit('credit-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/customer-credits/credit-1');
      });

      it('should handle special characters in credit ID', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await financialAPI.deleteCustomerCredit('credit@special');

        expect(mockClient.delete).toHaveBeenCalledWith(
          '/car-rental/customer-credits/credit@special',
        );
      });
    });
  });

  describe('Fines', () => {
    describe('listFines', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockFines: Fine[] = [
          {
            id: 'fine-1',
            reservation_id: 'res-1',
            customer_id: 'cust-1',
            vehicle_id: 'veh-1',
            type: 'damage',
            description: 'Scratch on door',
            amount: 150.0,
            status: 'pending',
            issued_date: '2024-01-01',
            due_date: '2024-01-15',
          },
        ];
        mockClient.get.mockResolvedValue(mockFines);

        const result = await financialAPI.listFines();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fines');
        expect(result).toEqual(mockFines);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { customer_id: 'cust-1', status: 'pending' };
        mockClient.get.mockResolvedValue([]);

        await financialAPI.listFines(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/fines?customer_id=cust-1&status=pending',
        );
      });

      it('should handle empty params object', async () => {
        mockClient.get.mockResolvedValue([]);

        await financialAPI.listFines({});

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fines?');
      });
    });

    describe('createFine', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Fine> = {
          customer_id: 'cust-1',
          vehicle_id: 'veh-1',
          type: 'late_return',
          description: 'Vehicle returned 2 hours late',
          amount: 50.0,
          status: 'pending',
          issued_date: '2024-01-01',
        };
        const mockFine: Fine = {
          ...(payload as Fine),
          id: 'fine-new',
        };
        mockClient.post.mockResolvedValue(mockFine);

        const result = await financialAPI.createFine(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/fines', payload);
        expect(result).toEqual(mockFine);
      });
    });

    describe('getFine', () => {
      it('should call client.get with correct URL', async () => {
        const mockFine: Fine = {
          id: 'fine-1',
          type: 'damage',
          description: 'Scratch',
          amount: 100.0,
          status: 'paid',
          issued_date: '2024-01-01',
          paid_date: '2024-01-05',
        };
        mockClient.get.mockResolvedValue(mockFine);

        const result = await financialAPI.getFine('fine-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fines/fine-1');
        expect(result).toEqual(mockFine);
      });
    });

    describe('updateFine', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<Fine> = {
          status: 'paid',
          paid_date: '2024-01-05',
        };
        mockClient.put.mockResolvedValue({ id: 'fine-1', ...payload });

        await financialAPI.updateFine('fine-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/fines/fine-1', payload);
      });
    });

    describe('deleteFine', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await financialAPI.deleteFine('fine-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/fines/fine-1');
      });
    });
  });

  describe('Packages', () => {
    describe('listPackageItems', () => {
      it('should call client.get with correct URL', async () => {
        const mockItems: PackageItem[] = [
          {
            id: 'item-1',
            package_id: 'pkg-1',
            item_type: 'insurance',
            item_id: 'ins-1',
            quantity: 1,
          },
        ];
        mockClient.get.mockResolvedValue(mockItems);

        const result = await financialAPI.listPackageItems();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/packages/items');
        expect(result).toEqual(mockItems);
      });
    });

    describe('getPackageItem', () => {
      it('should call client.get with correct URL', async () => {
        const mockItem: PackageItem = {
          id: 'item-1',
          package_id: 'pkg-1',
          item_type: 'addon',
          item_id: 'addon-1',
          quantity: 2,
        };
        mockClient.get.mockResolvedValue(mockItem);

        const result = await financialAPI.getPackageItem('item-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/packages/items/item-1');
        expect(result).toEqual(mockItem);
      });
    });

    describe('listPackages', () => {
      it('should call client.get with correct URL', async () => {
        const mockPackages: Package[] = [
          {
            id: 'pkg-1',
            name: 'Premium Package',
            description: 'Full insurance and GPS',
            price: 99.99,
            includes: ['insurance', 'gps', 'roadside'],
            duration: 7,
          },
        ];
        mockClient.get.mockResolvedValue(mockPackages);

        const result = await financialAPI.listPackages();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/packages');
        expect(result).toEqual(mockPackages);
      });
    });

    describe('getPackage', () => {
      it('should call client.get with correct URL', async () => {
        const mockPackage: Package = {
          id: 'pkg-1',
          name: 'Basic Package',
          price: 49.99,
          includes: ['basic_insurance'],
        };
        mockClient.get.mockResolvedValue(mockPackage);

        const result = await financialAPI.getPackage('pkg-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/packages/pkg-1');
        expect(result).toEqual(mockPackage);
      });
    });
  });

  describe('Quotes', () => {
    describe('listQuotes', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockQuotes: Quote[] = [
          {
            id: 'quote-1',
            customer_id: 'cust-1',
            vehicle_class: 'economy',
            start_date: '2024-04-01',
            end_date: '2024-04-07',
            total_amount: 299.99,
            status: 'active',
            expires_at: '2024-03-31T23:59:59Z',
            created_at: '2024-03-01T10:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockQuotes);

        const result = await financialAPI.listQuotes();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/quotes');
        expect(result).toEqual(mockQuotes);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { customer_id: 'cust-1', status: 'active' };
        mockClient.get.mockResolvedValue([]);

        await financialAPI.listQuotes(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/quotes?customer_id=cust-1&status=active',
        );
      });
    });

    describe('getQuote', () => {
      it('should call client.get with correct URL', async () => {
        const mockQuote: Quote = {
          id: 'quote-1',
          start_date: '2024-04-01',
          end_date: '2024-04-07',
          total_amount: 199.99,
          status: 'expired',
          expires_at: '2024-03-15T23:59:59Z',
          created_at: '2024-03-01T10:00:00Z',
        };
        mockClient.get.mockResolvedValue(mockQuote);

        const result = await financialAPI.getQuote('quote-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/quotes/quote-1');
        expect(result).toEqual(mockQuote);
      });

      it('should handle special characters in quote ID', async () => {
        mockClient.get.mockResolvedValue({ id: 'quote@special' });

        await financialAPI.getQuote('quote@special');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/quotes/quote@special');
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/financial').default;

      // Customer Credits
      expect(defaultExport.listCustomerCredits).toBeDefined();
      expect(defaultExport.createCustomerCredit).toBeDefined();
      expect(defaultExport.updateCustomerCredit).toBeDefined();
      expect(defaultExport.deleteCustomerCredit).toBeDefined();

      // Fines
      expect(defaultExport.listFines).toBeDefined();
      expect(defaultExport.createFine).toBeDefined();
      expect(defaultExport.getFine).toBeDefined();
      expect(defaultExport.updateFine).toBeDefined();
      expect(defaultExport.deleteFine).toBeDefined();

      // Packages
      expect(defaultExport.listPackageItems).toBeDefined();
      expect(defaultExport.getPackageItem).toBeDefined();
      expect(defaultExport.listPackages).toBeDefined();
      expect(defaultExport.getPackage).toBeDefined();

      // Quotes
      expect(defaultExport.listQuotes).toBeDefined();
      expect(defaultExport.getQuote).toBeDefined();
    });

    it('should have all functions be the same as named exports', () => {
      const defaultExport = require('../../../src/apis/car-rental/financial').default;

      expect(defaultExport.listCustomerCredits).toBe(financialAPI.listCustomerCredits);
      expect(defaultExport.createCustomerCredit).toBe(financialAPI.createCustomerCredit);
      expect(defaultExport.updateCustomerCredit).toBe(financialAPI.updateCustomerCredit);
      expect(defaultExport.deleteCustomerCredit).toBe(financialAPI.deleteCustomerCredit);

      expect(defaultExport.listFines).toBe(financialAPI.listFines);
      expect(defaultExport.createFine).toBe(financialAPI.createFine);
      expect(defaultExport.getFine).toBe(financialAPI.getFine);
      expect(defaultExport.updateFine).toBe(financialAPI.updateFine);
      expect(defaultExport.deleteFine).toBe(financialAPI.deleteFine);

      expect(defaultExport.listPackageItems).toBe(financialAPI.listPackageItems);
      expect(defaultExport.getPackageItem).toBe(financialAPI.getPackageItem);
      expect(defaultExport.listPackages).toBe(financialAPI.listPackages);
      expect(defaultExport.getPackage).toBe(financialAPI.getPackage);

      expect(defaultExport.listQuotes).toBe(financialAPI.listQuotes);
      expect(defaultExport.getQuote).toBe(financialAPI.getQuote);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from customer credit operations', async () => {
      const error = new Error('Credit operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(financialAPI.listCustomerCredits('cust-1')).rejects.toThrow(
        'Credit operation failed',
      );
      await expect(financialAPI.createCustomerCredit({})).rejects.toThrow(
        'Credit operation failed',
      );
      await expect(financialAPI.updateCustomerCredit('credit-1', {})).rejects.toThrow(
        'Credit operation failed',
      );
      await expect(financialAPI.deleteCustomerCredit('credit-1')).rejects.toThrow(
        'Credit operation failed',
      );
    });

    it('should propagate errors from fine operations', async () => {
      const error = new Error('Fine operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(financialAPI.listFines()).rejects.toThrow('Fine operation failed');
      await expect(financialAPI.createFine({})).rejects.toThrow('Fine operation failed');
      await expect(financialAPI.getFine('fine-1')).rejects.toThrow('Fine operation failed');
      await expect(financialAPI.updateFine('fine-1', {})).rejects.toThrow('Fine operation failed');
      await expect(financialAPI.deleteFine('fine-1')).rejects.toThrow('Fine operation failed');
    });

    it('should propagate errors from package operations', async () => {
      const error = new Error('Package operation failed');
      mockClient.get.mockRejectedValue(error);

      await expect(financialAPI.listPackageItems()).rejects.toThrow('Package operation failed');
      await expect(financialAPI.getPackageItem('item-1')).rejects.toThrow(
        'Package operation failed',
      );
      await expect(financialAPI.listPackages()).rejects.toThrow('Package operation failed');
      await expect(financialAPI.getPackage('pkg-1')).rejects.toThrow('Package operation failed');
    });

    it('should propagate errors from quote operations', async () => {
      const error = new Error('Quote operation failed');
      mockClient.get.mockRejectedValue(error);

      await expect(financialAPI.listQuotes()).rejects.toThrow('Quote operation failed');
      await expect(financialAPI.getQuote('quote-1')).rejects.toThrow('Quote operation failed');
    });
  });
});
