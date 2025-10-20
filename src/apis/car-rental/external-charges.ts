import client from '../../client';

export interface ExternalCharge {
  id: string;
  reservation_id: string;
  description: string;
  amount: number;
  charge_date: string;
  category?: string;
}

// External Charges
export const listExternalCharges = async (reservationId: string): Promise<ExternalCharge[]> =>
  client.get<ExternalCharge[]>(`/car-rental/reservations/${reservationId}/external-charges`);

export const createExternalCharge = async (reservationId: string, payload: Partial<ExternalCharge>): Promise<ExternalCharge> =>
  client.post<ExternalCharge>(`/car-rental/reservations/${reservationId}/external-charges`, payload);

export const deleteExternalCharge = async (reservationId: string, chargeId: string): Promise<void> =>
  client.delete(`/car-rental/reservations/${reservationId}/external-charges/${chargeId}`);

export default {
  listExternalCharges,
  createExternalCharge,
  deleteExternalCharge,
};