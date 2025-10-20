import client from '../../client';

export interface VehicleModel {
  id?: number;
  name: string;
  brand_id?: number;
  description?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of Vehicle Models
 */
export const listVehicleModels = async (): Promise<VehicleModel[]> =>
  client.get<VehicleModel[]>('/fleets/vehicles/models');

/**
 * Returns a single vehicle model
 */
export const getVehicleModel = async (id: number): Promise<VehicleModel> =>
  client.get<VehicleModel>(`/fleets/vehicles/models/${id}`);

export default {
  listVehicleModels,
  getVehicleModel,
};
