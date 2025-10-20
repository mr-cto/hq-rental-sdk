import client from '../../client';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'other';
  is_active: boolean;
  settings?: Record<string, any>;
}

export interface CreditCard {
  id: string;
  customer_id: string;
  card_type: string;
  last_four: string;
  expiry_month: number;
  expiry_year: number;
  cardholder_name: string;
  is_default?: boolean;
  created_at: string;
}

export interface PaymentTransaction {
  id: string;
  uuid: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  processed_at?: string;
  metadata?: Record<string, any>;
}

export interface StripeLocation {
  id: string;
  display_name: string;
  address: any;
  gateway_id: string;
}

export interface ConnectionToken {
  token: string;
  expires_at: string;
}

// Payment Gateways
export const listCustomerCreditCards = async (customerId: string): Promise<CreditCard[]> =>
  client.get<CreditCard[]>(`/payment-gateways/customers/${customerId}/cards`);

export const deletePaymentGateway = async (gatewayId: string): Promise<void> =>
  client.delete<void>(`/payment-gateways/${gatewayId}`);

export const listPaymentMethods = async (): Promise<PaymentMethod[]> =>
  client.get<PaymentMethod[]>('/payment-gateways/methods');

export const getPaymentMethod = async (methodId: string): Promise<PaymentMethod> =>
  client.get<PaymentMethod>(`/payment-gateways/methods/${methodId}`);

export const getPaymentMethodButton = async (methodId: string): Promise<any> =>
  client.get(`/payment-gateways/methods/${methodId}/button`);

export const getPaymentMethodForm = async (methodId: string): Promise<any> =>
  client.get(`/payment-gateways/methods/${methodId}/form`);

// Payment Transactions
export const getPaymentTransaction = async (uuid: string): Promise<PaymentTransaction> =>
  client.get<PaymentTransaction>(`/payment-gateways/transactions/${uuid}`);

export const listPaymentTransactions = async (params?: Record<string, any>): Promise<PaymentTransaction[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<PaymentTransaction[]>(`/payment-gateways/transactions${query}`);
};

export const createPaymentTransaction = async (payload: any): Promise<PaymentTransaction> =>
  client.post<PaymentTransaction>('/payment-gateways/transactions', payload);

export const refundPaymentTransaction = async (uuid: string, payload?: any): Promise<PaymentTransaction> =>
  client.post<PaymentTransaction>(`/payment-gateways/transactions/${uuid}/refund`, payload);

// Stripe Integration
export const listStripeLocations = async (gatewayId: string): Promise<StripeLocation[]> =>
  client.get<StripeLocation[]>(`/payment-gateways/${gatewayId}/stripe/locations`);

export const getConnectionToken = async (locationId: string): Promise<ConnectionToken> =>
  client.get<ConnectionToken>(`/payment-gateways/stripe/locations/${locationId}/connection-token`);

export const getStripeTerminalConnectionToken = async (): Promise<ConnectionToken> =>
  client.get<ConnectionToken>('/payment-gateways/stripe/terminal/connection-token');

export default {
  // Payment Gateways
  listCustomerCreditCards,
  deletePaymentGateway,
  listPaymentMethods,
  getPaymentMethod,
  getPaymentMethodButton,
  getPaymentMethodForm,
  
  // Payment Transactions
  getPaymentTransaction,
  listPaymentTransactions,
  createPaymentTransaction,
  refundPaymentTransaction,
  
  // Stripe Integration
  listStripeLocations,
  getConnectionToken,
  getStripeTerminalConnectionToken,
};