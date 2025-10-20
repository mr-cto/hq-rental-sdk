import client from '../../client';

export interface Refund {
  id: string;
  reservation_id: string;
  payment_id?: string;
  amount: number;
  reason: string;
  refund_date: string;
  status: 'pending' | 'completed' | 'failed';
  refund_method: string;
  transaction_id?: string;
  created_at: string;
}

// Refunds
export const listReservationRefunds = async (reservationId: string): Promise<Refund[]> =>
  client.get<Refund[]>(`/car-rental/reservations/${reservationId}/refunds`);

export const createReservationRefund = async (
  reservationId: string,
  payload: Partial<Refund>,
): Promise<Refund> =>
  client.post<Refund>(`/car-rental/reservations/${reservationId}/refunds`, payload);

export const updateReservationRefund = async (
  reservationId: string,
  refundId: string,
  payload: Partial<Refund>,
): Promise<Refund> =>
  client.put<Refund>(`/car-rental/reservations/${reservationId}/refunds/${refundId}`, payload);

export const deleteReservationRefund = async (
  reservationId: string,
  refundId: string,
): Promise<void> => client.delete(`/car-rental/reservations/${reservationId}/refunds/${refundId}`);

export default {
  listReservationRefunds,
  createReservationRefund,
  updateReservationRefund,
  deleteReservationRefund,
};
