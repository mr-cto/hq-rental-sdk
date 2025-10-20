import client from '../../client';

export interface BlockedPeriod {
  id: string;
  vehicle_id?: string;
  start_date: string;
  end_date: string;
  reason: string;
  description?: string;
  category: 'maintenance' | 'unavailable' | 'reserved' | 'other';
  created_by: string;
  created_at: string;
  updated_at?: string;
}

// Blocked Periods
export const listBlockedPeriods = async (params?: { vehicle_id?: string; start_date?: string; end_date?: string }): Promise<BlockedPeriod[]> => {
  const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
  return client.get<BlockedPeriod[]>(`/fleets/blocked-periods${query}`);
};

export const createBlockedPeriod = async (payload: Partial<BlockedPeriod>): Promise<BlockedPeriod> =>
  client.post<BlockedPeriod>('/fleets/blocked-periods', payload);

export const getBlockedPeriod = async (id: string): Promise<BlockedPeriod> =>
  client.get<BlockedPeriod>(`/fleets/blocked-periods/${id}`);

export const updateBlockedPeriod = async (id: string, payload: Partial<BlockedPeriod>): Promise<BlockedPeriod> =>
  client.put<BlockedPeriod>(`/fleets/blocked-periods/${id}`, payload);

export const deleteBlockedPeriod = async (id: string): Promise<void> =>
  client.delete(`/fleets/blocked-periods/${id}`);

export default {
  listBlockedPeriods,
  createBlockedPeriod,
  getBlockedPeriod,
  updateBlockedPeriod,
  deleteBlockedPeriod,
};