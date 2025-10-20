import client from '../../client';

/**
 * Delete payment gateway
 */
export const deletePaymentGateway = async (id: string): Promise<void> =>
  client.delete<void>(`/payment-gateways/${id}`);

export default {
  deletePaymentGateway,
};
