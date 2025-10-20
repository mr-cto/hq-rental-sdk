import client from '../../client';

export interface ReservationAttempt {
  id: string;
  email: string;
  phone?: string;
  attempted_at: string;
  status: 'pending' | 'completed' | 'failed';
  error_message?: string;
  reservation_data?: any;
}

// Reservation Attempts
export const listReservationAttempts = async (params?: Record<string, any>): Promise<ReservationAttempt[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<ReservationAttempt[]>(`/car-rental/reservation-attempts${query}`);
};

export const findReservationAttemptsByEmail = async (email: string): Promise<ReservationAttempt[]> =>
  client.get<ReservationAttempt[]>(`/car-rental/reservation-attempts?email=${encodeURIComponent(email)}`);

export default {
  listReservationAttempts,
  findReservationAttemptsByEmail,
};