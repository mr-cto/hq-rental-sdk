import client from '../../client';

export interface VehicleRelocation {
  id: string;
  vehicle_id: string;
  from_location: string;
  to_location: string;
  start_date: string;
  end_date?: string;
  driver_id?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  mileage_start?: number;
  mileage_end?: number;
  notes?: string;
  cost?: number;
  created_at: string;
  updated_at?: string;
}

// Vehicle Relocations
export const listVehicleRelocations = async (params?: {
  vehicle_id?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
}): Promise<VehicleRelocation[]> => {
  const query = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : '';
  return client.get<VehicleRelocation[]>(`/fleets/relocations${query}`);
};

export const createVehicleRelocation = async (
  payload: Partial<VehicleRelocation>,
): Promise<VehicleRelocation> => client.post<VehicleRelocation>('/fleets/relocations', payload);

export const getVehicleRelocation = async (id: string): Promise<VehicleRelocation> =>
  client.get<VehicleRelocation>(`/fleets/relocations/${id}`);

export const updateVehicleRelocation = async (
  id: string,
  payload: Partial<VehicleRelocation>,
): Promise<VehicleRelocation> =>
  client.put<VehicleRelocation>(`/fleets/relocations/${id}`, payload);

export const cancelVehicleRelocation = async (id: string): Promise<VehicleRelocation> =>
  client.put<VehicleRelocation>(`/fleets/relocations/${id}/cancel`);

export default {
  listVehicleRelocations,
  createVehicleRelocation,
  getVehicleRelocation,
  updateVehicleRelocation,
  cancelVehicleRelocation,
};
