import client from '../client';

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

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  is_active: boolean;
  created_at: string;
}

export interface DailyManifest {
  date: string;
  location_id?: string;
  pickups: any[];
  returns: any[];
  maintenance: any[];
  summary: {
    total_pickups: number;
    total_returns: number;
    total_maintenance: number;
    fleet_utilization: number;
  };
}

export interface ContactCategory {
  id: string;
  name: string;
  description?: string;
  fields?: string[];
}

export interface Contact {
  id: string;
  category_id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  created_at: string;
}

export interface Preference {
  id: string;
  module: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object';
  description?: string;
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

// Webhooks
export const registerWebhook = async (payload: Partial<Webhook>): Promise<Webhook> =>
  client.post<Webhook>('/car-rental/webhooks', payload);

// Daily Manifest
export const getDailyManifest = async (date?: string, locationId?: string): Promise<DailyManifest> => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (locationId) params.append('location_id', locationId);
  const query = params.toString() ? `?${params.toString()}` : '';
  return client.get<DailyManifest>(`/car-rental/daily-manifest${query}`);
};

// Filters
export const getFilterExamples = async (): Promise<any> =>
  client.get('/filters');

// Preferences
export const listPreferences = async (module?: string): Promise<Preference[]> => {
  const query = module ? `?module=${module}` : '';
  return client.get<Preference[]>(`/preferences${query}`);
};

// Contacts
export const listContactCategories = async (): Promise<ContactCategory[]> =>
  client.get<ContactCategory[]>('/contacts/categories');

export const getContactCategory = async (categoryId: string): Promise<ContactCategory> =>
  client.get<ContactCategory>(`/contacts/categories/${categoryId}`);

export const listContactsInCategory = async (categoryId: string): Promise<Contact[]> =>
  client.get<Contact[]>(`/contacts/categories/${categoryId}/contacts`);

export const createContact = async (payload: Partial<Contact>): Promise<Contact> =>
  client.post<Contact>('/contacts', payload);

export const getContact = async (contactId: string): Promise<Contact> =>
  client.get<Contact>(`/contacts/${contactId}`);

export const updateContact = async (contactId: string, payload: Partial<Contact>): Promise<Contact> =>
  client.put<Contact>(`/contacts/${contactId}`, payload);

export const mergeContacts = async (primaryContactId: string, secondaryContactId: string): Promise<Contact> =>
  client.post<Contact>(`/contacts/${primaryContactId}/merge`, { secondary_contact_id: secondaryContactId });

export default {
  // Payment Gateways
  listCustomerCreditCards,
  deletePaymentGateway,
  listPaymentMethods,
  getPaymentMethod,
  getPaymentMethodButton,
  
  // Webhooks
  registerWebhook,
  
  // Daily Manifest
  getDailyManifest,
  
  // Filters
  getFilterExamples,
  
  // Preferences
  listPreferences,
  
  // Contacts
  listContactCategories,
  getContactCategory,
  listContactsInCategory,
  createContact,
  getContact,
  updateContact,
  mergeContacts,
};