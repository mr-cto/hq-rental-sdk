import client from '../../client';
import { Rental as ReservationType } from '../../types';

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

// Core Reservations API
export const listReservations = async (params?: Record<string, any>): Promise<ReservationType[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<ReservationType[]>(`/car-rental/reservations${query}`);
};

export const findReservation = async (reservationId: string): Promise<ReservationType> =>
  client.get<ReservationType>(`/car-rental/reservations/${reservationId}`);

export const createReservation = async (payload: Partial<ReservationType>): Promise<ReservationType> =>
  client.post<ReservationType>('/car-rental/reservations', payload);

export const updateReservation = async (reservationId: string, payload: Partial<ReservationType>): Promise<ReservationType> =>
  client.put<ReservationType>(`/car-rental/reservations/${reservationId}`, payload);

// Reservation Status Management
export const setReservationOpen = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/open`);

export const setReservationCancel = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/cancel`);

export const setReservationPending = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/pending`);

export const setReservationQuote = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/quote`);

export const setReservationNoShow = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/no_show`);

// Booking Flow Functions
export const getDatesStepValidations = async (): Promise<any> =>
  client.get<any>('/car-rental/reservations/dates-step');

export const validateDatesAndGetClasses = async (payload: { 
  pickup_date: string; 
  return_date: string; 
  brand?: string; 
  location?: string; 
}): Promise<any> =>
  client.post<any>('/car-rental/reservations/validate-dates', payload);

export const updateVehicleClass = async (reservationId: string, payload: { vehicle_class: string }): Promise<ReservationType> =>
  client.put<ReservationType>(`/car-rental/reservations/${reservationId}/vehicle-class`, payload);

export const getAdditionalCharges = async (payload: {
  pickup_date: string;
  return_date: string;
  brand?: string;
  vehicle_class?: string;
}): Promise<any> =>
  client.post<any>('/car-rental/reservations/additional-charges', payload);

export const getPricing = async (payload: {
  vehicle_class: string;
  charges?: any[];
  pickup_date: string;
  return_date: string;
}): Promise<any> =>
  client.post<any>('/car-rental/reservations/pricing', payload);

export const createOrUpdateCustomer = async (payload: any): Promise<any> =>
  client.post<any>('/car-rental/reservations/customer', payload);

export const confirmReservation = async (payload: any): Promise<ReservationType> =>
  client.post<ReservationType>('/car-rental/reservations/confirm', payload);

// Rental Agreement and Signing
export const getRentalAgreement = async (reservationId: string): Promise<any> =>
  client.get<any>(`/car-rental/reservations/${reservationId}/rental-agreement`);

export const setSignDate = async (reservationId: string, payload: { sign_date: string }): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/sign-date`, payload);

export const uploadDriverSignature = async (reservationId: string, signature: File | string): Promise<any> =>
  client.post<any>(`/car-rental/reservations/${reservationId}/signature`, { signature });

// Vehicle Management
export const assignVehicle = async (reservationId: string, payload: { vehicle_id: string }): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/assign-vehicle`, payload);

export const detachVehicle = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/detach-vehicle`);

export const getAvailableVehicles = async (reservationId: string): Promise<any[]> =>
  client.get<any[]>(`/car-rental/reservations/${reservationId}/available-vehicles`);

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
  // Core Reservations
  listReservations,
  findReservation,
  createReservation,
  updateReservation,
  
  // Status Management
  setReservationOpen,
  setReservationCancel,
  setReservationPending,
  setReservationQuote,
  setReservationNoShow,
  
  // Booking Flow
  getDatesStepValidations,
  validateDatesAndGetClasses,
  updateVehicleClass,
  getAdditionalCharges,
  getPricing,
  createOrUpdateCustomer,
  confirmReservation,
  
  // Rental Agreement and Signing
  getRentalAgreement,
  setSignDate,
  uploadDriverSignature,
  
  // Vehicle Management
  assignVehicle,
  detachVehicle,
  getAvailableVehicles,
  
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