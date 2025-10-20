import client from '../../client';

export interface Address {
  id: string;
  street: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  created_at?: string;
  updated_at?: string;
}

export const listAddresses = async (params?: Record<string, any>): Promise<Address[]> => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<Address[]>(`/car-rental/addresses${q}`);
};

export const createAddress = async (payload: Partial<Address>): Promise<Address> =>
  client.post<Address>('/car-rental/addresses', payload);

export const getAddress = async (addressId: string): Promise<Address> =>
  client.get<Address>(`/car-rental/addresses/${addressId}`);

export const updateAddress = async (addressId: string, payload: Partial<Address>): Promise<Address> =>
  client.put<Address>(`/car-rental/addresses/${addressId}`, payload);

export const deleteAddress = async (addressId: string): Promise<void> =>
  client.delete<void>(`/car-rental/addresses/${addressId}`);

export default {
  listAddresses,
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};