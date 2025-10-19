import client from '../client';

export interface AdditionalCharge {
  id: string;
  name: string;
  description?: string;
  amount: number;
  type: 'fixed' | 'percentage' | 'per_day';
  applicable_to?: string[];
}

export interface Feature {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface RepairOrder {
  id: string;
  vehicle_id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  cost?: number;
  scheduled_date?: string;
  completed_date?: string;
  mechanic?: string;
}

// Additional Charges
export const listAdditionalCharges = async (): Promise<AdditionalCharge[]> =>
  client.get<AdditionalCharge[]>('/fleets/additional-charges');

export const getAdditionalCharge = async (chargeId: string): Promise<AdditionalCharge> =>
  client.get<AdditionalCharge>(`/fleets/additional-charges/${chargeId}`);

// Features
export const listFeatures = async (): Promise<Feature[]> =>
  client.get<Feature[]>('/fleets/features');

export const getFeature = async (featureId: string): Promise<Feature> =>
  client.get<Feature>(`/fleets/features/${featureId}`);

// Locations
export const listLocations = async (): Promise<Location[]> =>
  client.get<Location[]>('/fleets/locations');

// Repair Orders
export const listRepairOrders = async (params?: Record<string, any>): Promise<RepairOrder[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<RepairOrder[]>(`/fleets/repair-orders${query}`);
};

export default {
  listAdditionalCharges,
  getAdditionalCharge,
  listFeatures,
  getFeature,
  listLocations,
  listRepairOrders,
};