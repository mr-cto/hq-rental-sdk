import client from '../../client';

export interface PaymentTransaction {
  id?: string;
  uuid: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  created_at?: string;
  processed_at?: string;
  metadata?: Record<string, any>;
}

/**
 * Finds payment transaction by UUID
 */
export const getPaymentTransactionByUuid = async (uuid: string): Promise<PaymentTransaction> =>
  client.get<PaymentTransaction>(`/payment-gateways/transactions/${uuid}`);

/**
 * Create payment transaction
 */
export const createPaymentTransaction = async (transactionData: any): Promise<PaymentTransaction> =>
  client.post<PaymentTransaction>('/payment-gateways/transactions', transactionData);

/**
 * Refunds a payment transaction
 */
export const refundPaymentTransaction = async (
  uuid: string,
  refundData?: any,
): Promise<PaymentTransaction> =>
  client.post<PaymentTransaction>(`/payment-gateways/transactions/${uuid}/refund`, refundData);

/**
 * shows a list of payment transactions
 */
export const listPaymentTransactions = async (
  params?: Record<string, any>,
): Promise<PaymentTransaction[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<PaymentTransaction[]>(`/payment-gateways/transactions${query}`);
};

export default {
  getPaymentTransactionByUuid,
  listPaymentTransactions,
  createPaymentTransaction,
  refundPaymentTransaction,
};
