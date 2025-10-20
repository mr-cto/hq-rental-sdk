import client from '../../client';

export interface VehicleReplacement {
  id: string;
  reservation_id: string;
  original_vehicle_id: string;
  replacement_vehicle_id: string;
  replacement_date: string;
  reason: string;
  cost_adjustment?: number;
  notes?: string;
  created_at: string;
}

// Vehicle Replacements
export const listVehicleReplacements = async (reservationId: string): Promise<VehicleReplacement[]> =>
  client.get<VehicleReplacement[]>(`/car-rental/reservations/${reservationId}/vehicle-replacements`);

export const createVehicleReplacement = async (reservationId: string, payload: Partial<VehicleReplacement>): Promise<VehicleReplacement> =>
  client.post<VehicleReplacement>(`/car-rental/reservations/${reservationId}/vehicle-replacements`, payload);

export const updateVehicleReplacement = async (reservationId: string, replacementId: string, payload: Partial<VehicleReplacement>): Promise<VehicleReplacement> =>
  client.put<VehicleReplacement>(`/car-rental/reservations/${reservationId}/vehicle-replacements/${replacementId}`, payload);

export const deleteVehicleReplacement = async (reservationId: string, replacementId: string): Promise<void> =>
  client.delete(`/car-rental/reservations/${reservationId}/vehicle-replacements/${replacementId}`);

export default {
  listVehicleReplacements,
  createVehicleReplacement,
  updateVehicleReplacement,
  deleteVehicleReplacement,
};