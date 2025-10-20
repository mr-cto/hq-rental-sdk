import client from '../../client';

export interface CustomerCredit {
  id: string;
  customer_id: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  description?: string;
  transaction_date: string;
  created_at: string;
  updated_at?: string;
}

// Customer Credits
export const listCustomerCredits = async (customerId: string): Promise<CustomerCredit[]> =>
  client.get<CustomerCredit[]>(`/car-rental/customers/${customerId}/credits`);

export const createCustomerCredit = async (
  customerId: string,
  payload: Partial<CustomerCredit>,
): Promise<CustomerCredit> =>
  client.post<CustomerCredit>(`/car-rental/customers/${customerId}/credits`, payload);

export const updateCustomerCredit = async (
  customerId: string,
  creditId: string,
  payload: Partial<CustomerCredit>,
): Promise<CustomerCredit> =>
  client.put<CustomerCredit>(`/car-rental/customers/${customerId}/credits/${creditId}`, payload);

export const deleteCustomerCredit = async (customerId: string, creditId: string): Promise<void> =>
  client.delete(`/car-rental/customers/${customerId}/credits/${creditId}`);

export default {
  listCustomerCredits,
  createCustomerCredit,
  updateCustomerCredit,
  deleteCustomerCredit,
};
