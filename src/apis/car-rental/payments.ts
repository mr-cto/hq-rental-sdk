import client from '../../client';

export interface Payment {
  id: string;
  reservation_id: string;
  amount: number;
  payment_method: string;
  payment_date: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  notes?: string;
  created_at: string;
}

// Payments
export const listReservationPayments = async (reservationId: string): Promise<Payment[]> =>
  client.get<Payment[]>(`/car-rental/reservations/${reservationId}/payments`);

export const createReservationPayment = async (reservationId: string, payload: Partial<Payment>): Promise<Payment> =>
  client.post<Payment>(`/car-rental/reservations/${reservationId}/payments`, payload);

export const updateReservationPayment = async (reservationId: string, paymentId: string, payload: Partial<Payment>): Promise<Payment> =>
  client.put<Payment>(`/car-rental/reservations/${reservationId}/payments/${paymentId}`, payload);

export const refundSecurityDeposit = async (reservationId: string, payload: { amount: number; reason?: string }): Promise<Payment> =>
  client.post<Payment>(`/car-rental/reservations/${reservationId}/refund-security-deposit`, payload);

export const chargeCustomerCard = async (reservationId: string, payload: { amount: number; description?: string }): Promise<Payment> =>
  client.post<Payment>(`/car-rental/reservations/${reservationId}/charge-card`, payload);

export default {
  listReservationPayments,
  createReservationPayment,
  updateReservationPayment,
  refundSecurityDeposit,
  chargeCustomerCard,
};