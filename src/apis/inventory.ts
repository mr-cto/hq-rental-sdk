import client from '../client';
import { InventoryItem as ItemType } from '../types';

export const listInventory = async (params?: Record<string, any>): Promise<ItemType[]> => {
    const q = params ? `?${new URLSearchParams(params).toString()}` : '';
    return client.get<ItemType[]>(`/inventory${q}`);
};

export const getInventoryItem = async (id: string): Promise<ItemType> =>
    client.get<ItemType>(`/inventory/${id}`);

export const createInventoryItem = async (payload: Partial<ItemType>): Promise<ItemType> =>
    client.post<ItemType>('/inventory', payload);

export const updateInventoryItem = async (id: string, payload: Partial<ItemType>): Promise<ItemType> =>
    client.put<ItemType>(`/inventory/${id}`, payload);

export const deleteInventoryItem = async (id: string): Promise<void> =>
    client.delete<void>(`/inventory/${id}`);

export default {
    listInventory,
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
};