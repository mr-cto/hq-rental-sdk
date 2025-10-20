import client from '../../client';

export interface CustomerCredit {
  id: string;
  customer_id: string;
  amount: number;
  description?: string;
  transaction_type: 'credit' | 'debit';
  created_at: string;
  expires_at?: string;
}

export interface Fine {
  id: string;
  reservation_id?: string;
  customer_id?: string;
  vehicle_id?: string;
  type: string;
  description: string;
  amount: number;
  status: 'pending' | 'paid' | 'disputed' | 'cancelled';
  issued_date: string;
  due_date?: string;
  paid_date?: string;
}

export interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  includes: string[];
  duration?: number;
}

export interface PackageItem {
  id: string;
  package_id: string;
  item_type: string;
  item_id: string;
  quantity: number;
}

export interface Quote {
  id: string;
  customer_id?: string;
  vehicle_class?: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: 'active' | 'expired' | 'converted';
  expires_at: string;
  created_at: string;
}

// Customer Credits
export const listCustomerCredits = async (customerId: string): Promise<CustomerCredit[]> =>
  client.get<CustomerCredit[]>(`/car-rental/customer-credits?customer_id=${customerId}`);

export const createCustomerCredit = async (
  payload: Partial<CustomerCredit>,
): Promise<CustomerCredit> => client.post<CustomerCredit>('/car-rental/customer-credits', payload);

export const updateCustomerCredit = async (
  creditId: string,
  payload: Partial<CustomerCredit>,
): Promise<CustomerCredit> =>
  client.put<CustomerCredit>(`/car-rental/customer-credits/${creditId}`, payload);

export const deleteCustomerCredit = async (creditId: string): Promise<void> =>
  client.delete<void>(`/car-rental/customer-credits/${creditId}`);

// Fines
export const listFines = async (params?: Record<string, any>): Promise<Fine[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<Fine[]>(`/car-rental/fines${query}`);
};

export const createFine = async (payload: Partial<Fine>): Promise<Fine> =>
  client.post<Fine>('/car-rental/fines', payload);

export const getFine = async (fineId: string): Promise<Fine> =>
  client.get<Fine>(`/car-rental/fines/${fineId}`);

export const updateFine = async (fineId: string, payload: Partial<Fine>): Promise<Fine> =>
  client.put<Fine>(`/car-rental/fines/${fineId}`, payload);

export const deleteFine = async (fineId: string): Promise<void> =>
  client.delete<void>(`/car-rental/fines/${fineId}`);

// Packages
export const listPackageItems = async (): Promise<PackageItem[]> =>
  client.get<PackageItem[]>('/car-rental/packages/items');

export const getPackageItem = async (itemId: string): Promise<PackageItem> =>
  client.get<PackageItem>(`/car-rental/packages/items/${itemId}`);

export const listPackages = async (): Promise<Package[]> =>
  client.get<Package[]>('/car-rental/packages');

export const getPackage = async (packageId: string): Promise<Package> =>
  client.get<Package>(`/car-rental/packages/${packageId}`);

// Quotes
export const listQuotes = async (params?: Record<string, any>): Promise<Quote[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<Quote[]>(`/car-rental/quotes${query}`);
};

export const getQuote = async (quoteId: string): Promise<Quote> =>
  client.get<Quote>(`/car-rental/quotes/${quoteId}`);

export default {
  // Customer Credits
  listCustomerCredits,
  createCustomerCredit,
  updateCustomerCredit,
  deleteCustomerCredit,

  // Fines
  listFines,
  createFine,
  getFine,
  updateFine,
  deleteFine,

  // Packages
  listPackageItems,
  getPackageItem,
  listPackages,
  getPackage,

  // Quotes
  listQuotes,
  getQuote,
};
