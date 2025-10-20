import client from '../../client';

// Vehicle interfaces
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  status: 'available' | 'rented' | 'maintenance' | 'out_of_service';
  location_id?: string;
  vehicle_type_id?: string;
  vehicle_model_id?: string;
  mileage?: number;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleModel {
  id: string;
  name: string;
  brand_id: string;
  vehicle_type_id: string;
  features?: string[];
}

export interface VehicleType {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
}

export interface VehicleBrand {
  id: string;
  name: string;
  logo_url?: string;
}

export interface VehicleDamage {
  id: string;
  vehicle_id: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  location: string;
  reported_at: string;
  cost?: number;
}

export interface BlockedPeriod {
  id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  created_at?: string;
}

export interface VehicleRelocation {
  id: string;
  vehicle_id: string;
  from_location_id: string;
  to_location_id: string;
  scheduled_date: string;
  completed_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export interface MaintenanceRecord {
  id: string;
  vehicle_id: string;
  type: string;
  description: string;
  date: string;
  cost?: number;
  mileage?: number;
}

export interface TelematicsData {
  id: string;
  vehicle_id: string;
  timestamp: string;
  latitude?: number;
  longitude?: number;
  speed?: number;
  fuel_level?: number;
  engine_hours?: number;
  mileage?: number;
  data: Record<string, any>;
}

export interface VehicleAlert {
  id: string;
  vehicle_id: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  resolved?: boolean;
}

export interface VehicleTrip {
  id: string;
  vehicle_id: string;
  start_time: string;
  end_time?: string;
  start_location?: string;
  end_location?: string;
  distance?: number;
  duration?: number;
  reservation_id?: string;
}

// Vehicle operations
export const listVehicles = async (params?: Record<string, any>): Promise<Vehicle[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<Vehicle[]>(`/fleets/vehicles${query}`);
};

export const getVehicle = async (vehicleId: string): Promise<Vehicle> =>
  client.get<Vehicle>(`/fleets/vehicles/${vehicleId}`);

export const updateVehicle = async (vehicleId: string, payload: Partial<Vehicle>): Promise<Vehicle> =>
  client.put<Vehicle>(`/fleets/vehicles/${vehicleId}`, payload);

export const reserveVehicle = async (vehicleId: string, payload: any): Promise<any> =>
  client.post(`/fleets/vehicles/${vehicleId}/reserve`, payload);

export const cancelReservation = async (vehicleId: string): Promise<void> =>
  client.post<void>(`/fleets/vehicles/${vehicleId}/cancel-reserve`);

// Vehicle maintenance
export const getMaintenanceHistory = async (vehicleId: string): Promise<MaintenanceRecord[]> =>
  client.get<MaintenanceRecord[]>(`/fleets/vehicles/${vehicleId}/maintenance`);

// Vehicle models
export const listVehicleModels = async (): Promise<VehicleModel[]> =>
  client.get<VehicleModel[]>('/fleets/vehicles/models');

export const getVehicleModel = async (modelId: string): Promise<VehicleModel> =>
  client.get<VehicleModel>(`/fleets/vehicles/models/${modelId}`);

// Vehicle types
export const listVehicleTypes = async (): Promise<VehicleType[]> =>
  client.get<VehicleType[]>('/fleets/vehicles/types');

export const getVehicleType = async (typeId: string): Promise<VehicleType> =>
  client.get<VehicleType>(`/fleets/vehicles/types/${typeId}`);

// Vehicle brands
export const listVehicleBrands = async (): Promise<VehicleBrand[]> =>
  client.get<VehicleBrand[]>('/fleets/branches');

export const getVehicleBrand = async (brandId: string): Promise<VehicleBrand> =>
  client.get<VehicleBrand>(`/fleets/branches/${brandId}`);

// Vehicle damages
export const listVehicleDamages = async (vehicleId: string): Promise<VehicleDamage[]> =>
  client.get<VehicleDamage[]>(`/fleets/damages?vehicle_id=${vehicleId}`);

export const createVehicleDamage = async (payload: Partial<VehicleDamage>): Promise<VehicleDamage> =>
  client.post<VehicleDamage>('/fleets/damages', payload);

export const getVehicleDamage = async (damageId: string): Promise<VehicleDamage> =>
  client.get<VehicleDamage>(`/fleets/damages/${damageId}`);

export const updateVehicleDamage = async (damageId: string, payload: Partial<VehicleDamage>): Promise<VehicleDamage> =>
  client.put<VehicleDamage>(`/fleets/damages/${damageId}`, payload);

// Blocked periods
export const listBlockedPeriods = async (vehicleId: string): Promise<BlockedPeriod[]> =>
  client.get<BlockedPeriod[]>(`/fleets/blocked-periods?vehicle_id=${vehicleId}`);

export const createBlockedPeriod = async (payload: Partial<BlockedPeriod>): Promise<BlockedPeriod> =>
  client.post<BlockedPeriod>('/fleets/blocked-periods', payload);

export const updateBlockedPeriod = async (periodId: string, payload: Partial<BlockedPeriod>): Promise<BlockedPeriod> =>
  client.put<BlockedPeriod>(`/fleets/blocked-periods/${periodId}`, payload);

export const deleteBlockedPeriod = async (periodId: string): Promise<void> =>
  client.delete<void>(`/fleets/blocked-periods/${periodId}`);

// Relocations
export const listRelocations = async (): Promise<VehicleRelocation[]> =>
  client.get<VehicleRelocation[]>('/fleets/relocations');

export const createRelocation = async (payload: Partial<VehicleRelocation>): Promise<VehicleRelocation> =>
  client.post<VehicleRelocation>('/fleets/relocations', payload);

export const deleteRelocation = async (relocationId: string): Promise<void> =>
  client.delete<void>(`/fleets/relocations/${relocationId}`);

// Telematics
export const getVehicleOBDHistory = async (vehicleId: string, params?: Record<string, any>): Promise<TelematicsData[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<TelematicsData[]>(`/fleets/telematics/vehicles/${vehicleId}/obd${query}`);
};

export const getAllOBDHistory = async (params?: Record<string, any>): Promise<TelematicsData[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<TelematicsData[]>(`/fleets/telematics/obd${query}`);
};

export const getVehicleAlerts = async (vehicleId: string): Promise<VehicleAlert[]> =>
  client.get<VehicleAlert[]>(`/fleets/telematics/vehicles/${vehicleId}/alerts`);

export const getVehicleTrips = async (vehicleId: string, params?: Record<string, any>): Promise<VehicleTrip[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<VehicleTrip[]>(`/fleets/telematics/vehicles/${vehicleId}/trips${query}`);
};

export default {
  // Vehicles
  listVehicles,
  getVehicle,
  updateVehicle,
  reserveVehicle,
  cancelReservation,
  getMaintenanceHistory,
  
  // Models & Types
  listVehicleModels,
  getVehicleModel,
  listVehicleTypes,
  getVehicleType,
  listVehicleBrands,
  getVehicleBrand,
  
  // Damages
  listVehicleDamages,
  createVehicleDamage,
  getVehicleDamage,
  updateVehicleDamage,
  
  // Blocked Periods
  listBlockedPeriods,
  createBlockedPeriod,
  updateBlockedPeriod,
  deleteBlockedPeriod,
  
  // Relocations
  listRelocations,
  createRelocation,
  deleteRelocation,
  
  // Telematics
  getVehicleOBDHistory,
  getAllOBDHistory,
  getVehicleAlerts,
  getVehicleTrips,
};