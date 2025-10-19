import client from '../client';

export interface BlockedDay {
  id: string;
  date: string;
  reason?: string;
  location_id?: string;
}

export const listBlockedDays = async (params?: Record<string, any>): Promise<BlockedDay[]> => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<BlockedDay[]>(`/car-rental/blocked-days${q}`);
};

export default {
  listBlockedDays,
};