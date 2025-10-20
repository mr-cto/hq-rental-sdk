import client from '../../client';

export interface Extension {
  id: string;
  reservation_id: string;
  original_end_date: string;
  new_end_date: string;
  additional_days: number;
  additional_cost: number;
  created_at: string;
}

// Extensions
export const listReservationExtensions = async (reservationId: string): Promise<Extension[]> =>
  client.get<Extension[]>(`/car-rental/reservations/${reservationId}/extensions`);

export const createReservationExtension = async (reservationId: string, payload: Partial<Extension>): Promise<Extension> =>
  client.post<Extension>(`/car-rental/reservations/${reservationId}/extensions`, payload);

export const deleteReservationExtension = async (reservationId: string, extensionId: string): Promise<void> =>
  client.delete(`/car-rental/reservations/${reservationId}/extensions/${extensionId}`);

export default {
  listReservationExtensions,
  createReservationExtension,
  deleteReservationExtension,
};