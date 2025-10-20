import client from '../../client';

export interface CreditCard {
  id?: string;
  customer_id: string;
  card_type: string;
  last_four: string;
  expiry_month: number;
  expiry_year: number;
  cardholder_name: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of credit cards for one customer
 */
export const listCreditCards = async (customerId: string): Promise<CreditCard[]> =>
  client.get<CreditCard[]>(`/payment-gateways/customers/${customerId}/cards`);

export default {
  listCreditCards,
};
