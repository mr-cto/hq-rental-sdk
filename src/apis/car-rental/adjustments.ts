import client from '../../client';

export interface Adjustment {
  id: string;
  reservation_id: string;
  amount: number;
  description: string;
  type: 'credit' | 'debit';
  applied_date: string;
  created_at: string;
}

// Adjustments
export const listReservationAdjustments = async (reservationId: string): Promise<Adjustment[]> =>
  client.get<Adjustment[]>(`/car-rental/reservations/${reservationId}/adjustments`);

export const createReservationAdjustment = async (reservationId: string, payload: Partial<Adjustment>): Promise<Adjustment> =>
  client.post<Adjustment>(`/car-rental/reservations/${reservationId}/adjustments`, payload);

export const deleteReservationAdjustment = async (reservationId: string, adjustmentId: string): Promise<void> =>
  client.delete(`/car-rental/reservations/${reservationId}/adjustments/${adjustmentId}`);

export default {
  listReservationAdjustments,
  createReservationAdjustment,
  deleteReservationAdjustment,
};