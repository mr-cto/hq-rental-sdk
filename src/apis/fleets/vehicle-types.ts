import client from '../../client';

export interface VehicleType {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of Vehicle Types
 */
export const listVehicleTypes = async (): Promise<VehicleType[]> =>
  client.get<VehicleType[]>('/fleets/vehicles/types');

/**
 * Returns a single vehicle type
 */
export const getVehicleType = async (id: number): Promise<VehicleType> =>
  client.get<VehicleType>(`/fleets/vehicles/types/${id}`);

export default {
  listVehicleTypes,
  getVehicleType,
};
