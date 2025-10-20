import client from '../../client';

export interface PaymentMethod {
  id?: string;
  name: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'other';
  is_active: boolean;
  settings?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of payment methods
 */
export const listPaymentMethods = async (): Promise<PaymentMethod[]> =>
  client.get<PaymentMethod[]>('/payment-gateways/methods');

/**
 * Finds payment method by ID
 */
export const getPaymentMethod = async (id: string): Promise<PaymentMethod> =>
  client.get<PaymentMethod>(`/payment-gateways/methods/${id}`);

/**
 * Returns payment method button
 */
export const getPaymentMethodButton = async (id: string): Promise<any> =>
  client.get<any>(`/payment-gateways/methods/${id}/button`);

/**
 * Returns payment method form
 */
export const getPaymentMethodForm = async (id: string): Promise<any> =>
  client.get<any>(`/payment-gateways/methods/${id}/form`);

export default {
  listPaymentMethods,
  getPaymentMethod,
  getPaymentMethodButton,
  getPaymentMethodForm,
};
