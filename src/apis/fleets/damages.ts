import client from '../../client';

export interface VehicleDamage {
  id: string;
  vehicle_id: string;
  damage_type: string;
  severity: 'minor' | 'moderate' | 'major';
  description: string;
  location: string;
  cost?: number;
  repair_status: 'pending' | 'in_progress' | 'completed';
  damage_date: string;
  created_at: string;
  updated_at?: string;
}

// Vehicle Damages
export const listVehicleDamages = async (vehicleId: string): Promise<VehicleDamage[]> =>
  client.get<VehicleDamage[]>(`/fleets/vehicles/${vehicleId}/damages`);

export const createVehicleDamage = async (
  vehicleId: string,
  payload: Partial<VehicleDamage>,
): Promise<VehicleDamage> =>
  client.post<VehicleDamage>(`/fleets/vehicles/${vehicleId}/damages`, payload);

export const getVehicleDamage = async (
  vehicleId: string,
  damageId: string,
): Promise<VehicleDamage> =>
  client.get<VehicleDamage>(`/fleets/vehicles/${vehicleId}/damages/${damageId}`);

export const updateVehicleDamage = async (
  vehicleId: string,
  damageId: string,
  payload: Partial<VehicleDamage>,
): Promise<VehicleDamage> =>
  client.put<VehicleDamage>(`/fleets/vehicles/${vehicleId}/damages/${damageId}`, payload);

export default {
  listVehicleDamages,
  createVehicleDamage,
  getVehicleDamage,
  updateVehicleDamage,
};
