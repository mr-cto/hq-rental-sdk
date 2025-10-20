import * as paymentGatewaysAPI from '../../../src/apis/payment-gateways';
import type {
  PaymentMethod,
  CreditCard,
  PaymentTransaction,
  StripeLocation,
  ConnectionToken,
} from '../../../src/apis/payment-gateways';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Payment Gateways API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Payment Gateways', () => {
    describe('listCustomerCreditCards', () => {
      it('should call client.get with correct URL', async () => {
        const mockCards: CreditCard[] = [
          {
            id: 'card-1',
            customer_id: 'cust-1',
            card_type: 'visa',
            last_four: '1234',
            expiry_month: 12,
            expiry_year: 2025,
            cardholder_name: 'John Doe',
            is_default: true,
            created_at: '2024-01-01T00:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockCards);

        const result = await paymentGatewaysAPI.listCustomerCreditCards('cust-1');

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/customers/cust-1/cards');
        expect(result).toEqual(mockCards);
      });

      it('should handle special characters in customer ID', async () => {
        mockClient.get.mockResolvedValue([]);

        await paymentGatewaysAPI.listCustomerCreditCards('cust@special');

        expect(mockClient.get).toHaveBeenCalledWith(
          '/payment-gateways/customers/cust@special/cards',
        );
      });

      it('should handle empty cards list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await paymentGatewaysAPI.listCustomerCreditCards('cust-1');

        expect(result).toEqual([]);
      });
    });

    describe('deletePaymentGateway', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await paymentGatewaysAPI.deletePaymentGateway('gateway-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/payment-gateways/gateway-1');
      });

      it('should handle special characters in gateway ID', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await paymentGatewaysAPI.deletePaymentGateway('gateway@special');

        expect(mockClient.delete).toHaveBeenCalledWith('/payment-gateways/gateway@special');
      });
    });

    describe('listPaymentMethods', () => {
      it('should call client.get with correct URL', async () => {
        const mockMethods: PaymentMethod[] = [
          {
            id: 'method-1',
            name: 'Credit Card',
            type: 'credit_card',
            is_active: true,
            settings: { currency: 'USD' },
          },
        ];
        mockClient.get.mockResolvedValue(mockMethods);

        const result = await paymentGatewaysAPI.listPaymentMethods();

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/methods');
        expect(result).toEqual(mockMethods);
      });

      it('should handle empty methods list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await paymentGatewaysAPI.listPaymentMethods();

        expect(result).toEqual([]);
      });
    });

    describe('getPaymentMethod', () => {
      it('should call client.get with correct URL', async () => {
        const mockMethod: PaymentMethod = {
          id: 'method-1',
          name: 'Credit Card',
          type: 'credit_card',
          is_active: true,
          settings: { currency: 'USD' },
        };
        mockClient.get.mockResolvedValue(mockMethod);

        const result = await paymentGatewaysAPI.getPaymentMethod('method-1');

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/methods/method-1');
        expect(result).toEqual(mockMethod);
      });
    });

    describe('getPaymentMethodButton', () => {
      it('should call client.get with correct URL', async () => {
        const mockButton = { html: '<button>Pay Now</button>', style: 'primary' };
        mockClient.get.mockResolvedValue(mockButton);

        const result = await paymentGatewaysAPI.getPaymentMethodButton('method-1');

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/methods/method-1/button');
        expect(result).toEqual(mockButton);
      });
    });

    describe('getPaymentMethodForm', () => {
      it('should call client.get with correct URL', async () => {
        const mockForm = { fields: ['card_number', 'expiry_date', 'cvv'] };
        mockClient.get.mockResolvedValue(mockForm);

        const result = await paymentGatewaysAPI.getPaymentMethodForm('method-1');

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/methods/method-1/form');
        expect(result).toEqual(mockForm);
      });
    });
  });

  describe('Payment Transactions', () => {
    describe('getPaymentTransaction', () => {
      it('should call client.get with correct URL', async () => {
        const mockTransaction: PaymentTransaction = {
          id: 'trans-1',
          uuid: 'uuid-123',
          amount: 100.0,
          currency: 'USD',
          status: 'completed',
          payment_method: 'credit_card',
          created_at: '2024-01-01T00:00:00Z',
          processed_at: '2024-01-01T00:05:00Z',
        };
        mockClient.get.mockResolvedValue(mockTransaction);

        const result = await paymentGatewaysAPI.getPaymentTransaction('uuid-123');

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/transactions/uuid-123');
        expect(result).toEqual(mockTransaction);
      });
    });

    describe('listPaymentTransactions', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockTransactions: PaymentTransaction[] = [
          {
            id: 'trans-1',
            uuid: 'uuid-123',
            amount: 100.0,
            currency: 'USD',
            status: 'completed',
            payment_method: 'credit_card',
            created_at: '2024-01-01T00:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockTransactions);

        const result = await paymentGatewaysAPI.listPaymentTransactions();

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/transactions');
        expect(result).toEqual(mockTransactions);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { status: 'completed', customer_id: 'cust-1' };
        mockClient.get.mockResolvedValue([]);

        await paymentGatewaysAPI.listPaymentTransactions(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/payment-gateways/transactions?status=completed&customer_id=cust-1',
        );
      });
    });

    describe('createPaymentTransaction', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = {
          amount: 150.0,
          currency: 'USD',
          payment_method: 'credit_card',
          customer_id: 'cust-1',
          metadata: { rental_id: 'rental-1' },
        };
        const mockTransaction: PaymentTransaction = {
          ...payload,
          id: 'trans-new',
          uuid: 'uuid-new',
          status: 'pending',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockTransaction);

        const result = await paymentGatewaysAPI.createPaymentTransaction(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/payment-gateways/transactions', payload);
        expect(result).toEqual(mockTransaction);
      });
    });

    describe('refundPaymentTransaction', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = { amount: 50.0, reason: 'Partial refund' };
        const mockRefund: PaymentTransaction = {
          id: 'trans-refund',
          uuid: 'uuid-refund',
          amount: -50.0,
          currency: 'USD',
          status: 'completed',
          payment_method: 'credit_card',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockRefund);

        const result = await paymentGatewaysAPI.refundPaymentTransaction('uuid-123', payload);

        expect(mockClient.post).toHaveBeenCalledWith(
          '/payment-gateways/transactions/uuid-123/refund',
          payload,
        );
        expect(result).toEqual(mockRefund);
      });

      it('should handle refund without payload', async () => {
        const mockRefund: PaymentTransaction = {
          id: 'trans-refund-full',
          uuid: 'uuid-refund-full',
          amount: -100.0,
          currency: 'USD',
          status: 'completed',
          payment_method: 'credit_card',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockRefund);

        const result = await paymentGatewaysAPI.refundPaymentTransaction('uuid-123');

        expect(mockClient.post).toHaveBeenCalledWith(
          '/payment-gateways/transactions/uuid-123/refund',
          undefined,
        );
        expect(result).toEqual(mockRefund);
      });
    });
  });

  describe('Stripe Integration', () => {
    describe('listStripeLocations', () => {
      it('should call client.get with correct URL', async () => {
        const mockLocations: StripeLocation[] = [
          {
            id: 'loc-1',
            display_name: 'Main Office',
            address: { line1: '123 Main St', city: 'Anytown', state: 'ST', postal_code: '12345' },
            gateway_id: 'gateway-1',
          },
          {
            id: 'loc-2',
            display_name: 'Branch Office',
            address: {
              line1: '456 Branch Ave',
              city: 'Branchtown',
              state: 'ST',
              postal_code: '67890',
            },
            gateway_id: 'gateway-1',
          },
        ];
        mockClient.get.mockResolvedValue(mockLocations);

        const result = await paymentGatewaysAPI.listStripeLocations('gateway-1');

        expect(mockClient.get).toHaveBeenCalledWith('/payment-gateways/gateway-1/stripe/locations');
        expect(result).toEqual(mockLocations);
      });
    });

    describe('getConnectionToken', () => {
      it('should call client.get with correct URL', async () => {
        const mockToken: ConnectionToken = {
          token: 'tok_123456789',
          expires_at: '2024-01-01T01:00:00Z',
        };
        mockClient.get.mockResolvedValue(mockToken);

        const result = await paymentGatewaysAPI.getConnectionToken('loc-1');

        expect(mockClient.get).toHaveBeenCalledWith(
          '/payment-gateways/stripe/locations/loc-1/connection-token',
        );
        expect(result).toEqual(mockToken);
      });
    });

    describe('getStripeTerminalConnectionToken', () => {
      it('should call client.get with correct URL', async () => {
        const mockToken: ConnectionToken = {
          token: 'tok_terminal_123456789',
          expires_at: '2024-01-01T01:00:00Z',
        };
        mockClient.get.mockResolvedValue(mockToken);

        const result = await paymentGatewaysAPI.getStripeTerminalConnectionToken();

        expect(mockClient.get).toHaveBeenCalledWith(
          '/payment-gateways/stripe/terminal/connection-token',
        );
        expect(result).toEqual(mockToken);
      });
    });
  });

  describe('Default Export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/payment-gateways').default;

      expect(defaultExport).toHaveProperty('listCustomerCreditCards');
      expect(defaultExport).toHaveProperty('deletePaymentGateway');
      expect(defaultExport).toHaveProperty('listPaymentMethods');
      expect(defaultExport).toHaveProperty('getPaymentMethod');
      expect(defaultExport).toHaveProperty('getPaymentMethodButton');
      expect(defaultExport).toHaveProperty('getPaymentMethodForm');
      expect(defaultExport).toHaveProperty('getPaymentTransaction');
      expect(defaultExport).toHaveProperty('listPaymentTransactions');
      expect(defaultExport).toHaveProperty('createPaymentTransaction');
      expect(defaultExport).toHaveProperty('refundPaymentTransaction');
      expect(defaultExport).toHaveProperty('listStripeLocations');
      expect(defaultExport).toHaveProperty('getConnectionToken');
      expect(defaultExport).toHaveProperty('getStripeTerminalConnectionToken');
    });
  });

  describe('Error Handling', () => {
    it('should propagate errors from payment gateway operations', async () => {
      const error = new Error('Payment gateway operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(paymentGatewaysAPI.listCustomerCreditCards('cust-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.deletePaymentGateway('gateway-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.listPaymentMethods()).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.getPaymentMethod('method-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.getPaymentMethodButton('method-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.getPaymentMethodForm('method-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.getPaymentTransaction('uuid-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.listPaymentTransactions()).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.createPaymentTransaction({})).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.refundPaymentTransaction('uuid-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.listStripeLocations('gateway-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.getConnectionToken('loc-1')).rejects.toThrow(
        'Payment gateway operation failed',
      );
      await expect(paymentGatewaysAPI.getStripeTerminalConnectionToken()).rejects.toThrow(
        'Payment gateway operation failed',
      );
    });
  });
});
