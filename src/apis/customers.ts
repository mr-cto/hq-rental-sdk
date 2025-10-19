import client from '../client';
import { Customer as CustomerType } from '../types';

const BASE = '/car-rental/addresses'; // many APIs are nested; using 'customers' root where appropriate

export const listCustomers = async (params?: Record<string, any>): Promise<CustomerType[]> => {
    const q = params ? `?${new URLSearchParams(params).toString()}` : '';
    return client.get<CustomerType[]>(`/customers${q}`);
};

export const getCustomer = async (customerId: string): Promise<CustomerType> =>
    client.get<CustomerType>(`/customers/${customerId}`);

export const createCustomer = async (payload: Partial<CustomerType>): Promise<CustomerType> =>
    client.post<CustomerType>('/customers', payload);

export const updateCustomer = async (customerId: string, payload: Partial<CustomerType>): Promise<CustomerType> =>
    client.put<CustomerType>(`/customers/${customerId}`, payload);

export const deleteCustomer = async (customerId: string): Promise<void> =>
    client.delete<void>(`/customers/${customerId}`);

export default {
    listCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};