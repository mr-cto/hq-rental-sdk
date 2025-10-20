import client from '../../client';

export interface Vehicle {
  id?: number;
  license_plate: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  status: string;
  location_id?: number;
  brand_id?: number;
  type_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MaintenanceRecord {
  id?: number;
  vehicle_id: number;
  type: string;
  description?: string;
  cost?: number;
  date: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows maintenance history records for a vehicle
 */
export const getVehicleMaintenanceHistory = async (
  vehicleId: number,
): Promise<MaintenanceRecord[]> =>
  client.get<MaintenanceRecord[]>(`/fleets/vehicles/${vehicleId}/maintenance`);

/**
 * Shows a list of vehicles
 */
export const listVehicles = async (): Promise<Vehicle[]> =>
  client.get<Vehicle[]>('/fleets/vehicles');

/**
 * Show the details of a specific vehicle
 */
export const getVehicle = async (id: number): Promise<Vehicle> =>
  client.get<Vehicle>(`/fleets/vehicles/${id}`);

/**
 * Update Vehicle
 */
export const updateVehicle = async (id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle> =>
  client.put<Vehicle>(`/fleets/vehicles/${id}`, vehicleData);

/**
 * Reserve vehicle
 */
export const reserveVehicle = async (id: number, reservationData: any): Promise<any> =>
  client.post<any>(`/fleets/vehicles/${id}/reserve`, reservationData);

/**
 * Cancel Reserve
 */
export const cancelVehicleReserve = async (id: number): Promise<any> =>
  client.delete<any>(`/fleets/vehicles/${id}/reserve`);

export default {
  getVehicleMaintenanceHistory,
  listVehicles,
  getVehicle,
  updateVehicle,
  reserveVehicle,
  cancelVehicleReserve,
};
