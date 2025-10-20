import client from '../../client';

export interface VehicleBrand {
  id: string;
  name: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
}

// Vehicle Brands (Branches in spec)
export const listVehicleBrands = async (): Promise<VehicleBrand[]> =>
  client.get<VehicleBrand[]>('/fleets/brands');

export const getVehicleBrand = async (brandId: string): Promise<VehicleBrand> =>
  client.get<VehicleBrand>(`/fleets/brands/${brandId}`);

export default {
  listVehicleBrands,
  getVehicleBrand,
};