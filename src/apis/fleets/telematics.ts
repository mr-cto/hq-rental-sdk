import client from '../../client';

export interface TelematicsData {
  id: string;
  vehicle_id: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  speed?: number;
  heading?: number;
  odometer?: number;
  fuel_level?: number;
  engine_status?: 'on' | 'off' | 'idle';
  battery_voltage?: number;
  diagnostics?: Record<string, any>;
  events?: string[];
  created_at: string;
}

export interface TelematicsDevice {
  id: string;
  vehicle_id: string;
  device_id: string;
  device_type: string;
  status: 'active' | 'inactive' | 'maintenance';
  last_communication?: string;
  firmware_version?: string;
  installed_date: string;
  created_at: string;
  updated_at?: string;
}

// Telematics Data
export const listTelematicsData = async (
  vehicleId: string,
  params?: { start_date?: string; end_date?: string; limit?: number },
): Promise<TelematicsData[]> => {
  const query = params
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : '';
  return client.get<TelematicsData[]>(`/fleets/vehicles/${vehicleId}/telematics${query}`);
};

export const getLatestTelematicsData = async (vehicleId: string): Promise<TelematicsData> =>
  client.get<TelematicsData>(`/fleets/vehicles/${vehicleId}/telematics/latest`);

// Telematics Devices
export const listTelematicsDevices = async (): Promise<TelematicsDevice[]> =>
  client.get<TelematicsDevice[]>('/fleets/telematics/devices');

export const createTelematicsDevice = async (
  payload: Partial<TelematicsDevice>,
): Promise<TelematicsDevice> =>
  client.post<TelematicsDevice>('/fleets/telematics/devices', payload);

export const getTelematicsDevice = async (deviceId: string): Promise<TelematicsDevice> =>
  client.get<TelematicsDevice>(`/fleets/telematics/devices/${deviceId}`);

export const updateTelematicsDevice = async (
  deviceId: string,
  payload: Partial<TelematicsDevice>,
): Promise<TelematicsDevice> =>
  client.put<TelematicsDevice>(`/fleets/telematics/devices/${deviceId}`, payload);

export const deleteTelematicsDevice = async (deviceId: string): Promise<void> =>
  client.delete(`/fleets/telematics/devices/${deviceId}`);

export default {
  listTelematicsData,
  getLatestTelematicsData,
  listTelematicsDevices,
  createTelematicsDevice,
  getTelematicsDevice,
  updateTelematicsDevice,
  deleteTelematicsDevice,
};
