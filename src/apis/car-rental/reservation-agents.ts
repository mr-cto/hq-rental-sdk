import client from '../../client';

export interface ReservationAgent {
  id: string;
  name: string;
  email: string;
  role: 'primary' | 'return' | 'support';
  active: boolean;
  location?: string;
  created_at: string;
}

// Reservation Agents
export const listReservationAgents = async (): Promise<ReservationAgent[]> =>
  client.get<ReservationAgent[]>('/car-rental/reservation-agents');

export const assignPrimaryAgent = async (
  reservationId: string,
  payload: { agent_id: string },
): Promise<void> =>
  client.post(`/car-rental/reservations/${reservationId}/assign-primary-agent`, payload);

export const assignReturnAgent = async (
  reservationId: string,
  payload: { agent_id: string },
): Promise<void> =>
  client.post(`/car-rental/reservations/${reservationId}/assign-return-agent`, payload);

export default {
  listReservationAgents,
  assignPrimaryAgent,
  assignReturnAgent,
};
