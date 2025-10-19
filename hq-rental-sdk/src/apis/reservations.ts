import client from '../client';

export interface ReservationAttempt {
  id: string;
  email: string;
  phone?: string;
  attempted_at: string;
  status: 'pending' | 'completed' | 'failed';
  error_message?: string;
  reservation_data?: any;
}

export interface Extension {
  id: string;
  reservation_id: string;
  original_end_date: string;
  new_end_date: string;
  additional_days: number;
  additional_cost: number;
  created_at: string;
}

export interface ExternalCharge {
  id: string;
  reservation_id: string;
  description: string;
  amount: number;
  charge_date: string;
  category?: string;
}

export interface Adjustment {
  id: string;
  reservation_id: string;
  type: 'discount' | 'fee' | 'credit' | 'charge';
  description: string;
  amount: number;
  created_at: string;
  created_by?: string;
}

export interface Payment {
  id: string;
  reservation_id: string;
  amount: number;
  payment_method: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_date: string;
  notes?: string;
}

export interface Refund {
  id: string;
  reservation_id: string;
  payment_id?: string;
  amount: number;
  reason: string;
  status: 'pending' | 'processed' | 'failed';
  refund_date?: string;
  processed_date?: string;
}

export interface VehicleReplacement {
  id: string;
  reservation_id: string;
  original_vehicle_id: string;
  replacement_vehicle_id: string;
  reason: string;
  replaced_at: string;
  additional_cost?: number;
}

export interface ReservationAgent {
  id: string;
  name: string;
  email: string;
  role: 'rental' | 'return' | 'both';
  location_id?: string;
}

// Reservation Attempts
export const listReservationAttempts = async (params?: Record<string, any>): Promise<ReservationAttempt[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<ReservationAttempt[]>(`/car-rental/reservation-attempts${query}`);
};

export const findReservationAttemptsByEmail = async (email: string): Promise<ReservationAttempt[]> =>
  client.get<ReservationAttempt[]>(`/car-rental/reservation-attempts?email=${email}`);

// Extensions
export const listReservationExtensions = async (reservationId: string): Promise<Extension[]> =>
  client.get<Extension[]>(`/car-rental/reservations/${reservationId}/extensions`);

export const createReservationExtension = async (reservationId: string, payload: Partial<Extension>): Promise<Extension> =>
  client.post<Extension>(`/car-rental/reservations/${reservationId}/extensions`, payload);

export const deleteReservationExtension = async (reservationId: string, extensionId: string): Promise<void> =>
  client.delete<void>(`/car-rental/reservations/${reservationId}/extensions/${extensionId}`);

// External Charges
export const listExternalCharges = async (reservationId: string): Promise<ExternalCharge[]> =>
  client.get<ExternalCharge[]>(`/car-rental/reservations/${reservationId}/external-charges`);

export const createExternalCharge = async (reservationId: string, payload: Partial<ExternalCharge>): Promise<ExternalCharge> =>
  client.post<ExternalCharge>(`/car-rental/reservations/${reservationId}/external-charges`, payload);

export const deleteExternalCharge = async (reservationId: string, chargeId: string): Promise<void> =>
  client.delete<void>(`/car-rental/reservations/${reservationId}/external-charges/${chargeId}`);

// Adjustments
export const listReservationAdjustments = async (reservationId: string): Promise<Adjustment[]> =>
  client.get<Adjustment[]>(`/car-rental/reservations/${reservationId}/adjustments`);

export const createReservationAdjustment = async (reservationId: string, payload: Partial<Adjustment>): Promise<Adjustment> =>
  client.post<Adjustment>(`/car-rental/reservations/${reservationId}/adjustments`, payload);

export const deleteReservationAdjustment = async (reservationId: string, adjustmentId: string): Promise<void> =>
  client.delete<void>(`/car-rental/reservations/${reservationId}/adjustments/${adjustmentId}`);

// Payments
export const listReservationPayments = async (reservationId: string): Promise<Payment[]> =>
  client.get<Payment[]>(`/car-rental/reservations/${reservationId}/payments`);

export const createReservationPayment = async (reservationId: string, payload: Partial<Payment>): Promise<Payment> =>
  client.post<Payment>(`/car-rental/reservations/${reservationId}/payments`, payload);

export const updateReservationPayment = async (reservationId: string, paymentId: string, payload: Partial<Payment>): Promise<Payment> =>
  client.put<Payment>(`/car-rental/reservations/${reservationId}/payments/${paymentId}`, payload);

export const refundSecurityDeposit = async (reservationId: string, payload: any): Promise<any> =>
  client.post(`/car-rental/reservations/${reservationId}/payments/refund-deposit`, payload);

export const chargeCustomerCard = async (reservationId: string, payload: any): Promise<any> =>
  client.post(`/car-rental/reservations/${reservationId}/payments/charge`, payload);

// Refunds
export const listReservationRefunds = async (reservationId: string): Promise<Refund[]> =>
  client.get<Refund[]>(`/car-rental/reservations/${reservationId}/refunds`);

export const createReservationRefund = async (reservationId: string, payload: Partial<Refund>): Promise<Refund> =>
  client.post<Refund>(`/car-rental/reservations/${reservationId}/refunds`, payload);

export const updateReservationRefund = async (reservationId: string, refundId: string, payload: Partial<Refund>): Promise<Refund> =>
  client.put<Refund>(`/car-rental/reservations/${reservationId}/refunds/${refundId}`, payload);

export const deleteReservationRefund = async (reservationId: string, refundId: string): Promise<void> =>
  client.delete<void>(`/car-rental/reservations/${reservationId}/refunds/${refundId}`);

// Vehicle Replacements
export const listVehicleReplacements = async (reservationId: string): Promise<VehicleReplacement[]> =>
  client.get<VehicleReplacement[]>(`/car-rental/reservations/${reservationId}/vehicle-replacements`);

export const createVehicleReplacement = async (reservationId: string, payload: Partial<VehicleReplacement>): Promise<VehicleReplacement> =>
  client.post<VehicleReplacement>(`/car-rental/reservations/${reservationId}/vehicle-replacements`, payload);

export const updateVehicleReplacement = async (reservationId: string, replacementId: string, payload: Partial<VehicleReplacement>): Promise<VehicleReplacement> =>
  client.put<VehicleReplacement>(`/car-rental/reservations/${reservationId}/vehicle-replacements/${replacementId}`, payload);

export const deleteVehicleReplacement = async (reservationId: string, replacementId: string): Promise<void> =>
  client.delete<void>(`/car-rental/reservations/${reservationId}/vehicle-replacements/${replacementId}`);

// Reservation Agents
export const listReservationAgents = async (): Promise<ReservationAgent[]> =>
  client.get<ReservationAgent[]>('/car-rental/reservation-agents');

export const assignPrimaryAgent = async (reservationId: string, agentId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/agents/primary`, { agent_id: agentId });

export const assignReturnAgent = async (reservationId: string, agentId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/agents/return`, { agent_id: agentId });

export default {
  // Reservation Attempts
  listReservationAttempts,
  findReservationAttemptsByEmail,
  
  // Extensions
  listReservationExtensions,
  createReservationExtension,
  deleteReservationExtension,
  
  // External Charges
  listExternalCharges,
  createExternalCharge,
  deleteExternalCharge,
  
  // Adjustments
  listReservationAdjustments,
  createReservationAdjustment,
  deleteReservationAdjustment,
  
  // Payments
  listReservationPayments,
  createReservationPayment,
  updateReservationPayment,
  refundSecurityDeposit,
  chargeCustomerCard,
  
  // Refunds
  listReservationRefunds,
  createReservationRefund,
  updateReservationRefund,
  deleteReservationRefund,
  
  // Vehicle Replacements
  listVehicleReplacements,
  createVehicleReplacement,
  updateVehicleReplacement,
  deleteVehicleReplacement,
  
  // Reservation Agents
  listReservationAgents,
  assignPrimaryAgent,
  assignReturnAgent,
};