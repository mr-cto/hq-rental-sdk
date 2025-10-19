import client from '../client';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type?: string;
}

export interface EmailTriggerRequest {
  template_id: string;
  recipient_email?: string;
  data?: Record<string, any>;
}

// Email templates
export const listEmailTemplates = async (): Promise<EmailTemplate[]> =>
  client.get<EmailTemplate[]>('/car-rental/emails/templates');

export const triggerEmailTemplate = async (request: EmailTriggerRequest): Promise<void> =>
  client.post<void>('/car-rental/emails/trigger', request);

// Reservation emails
export const sendReservationConfirmation = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/emails/confirmation`);

export const sendReservationContract = async (reservationId: string): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/emails/contract`);

export const listReservationEmailTemplates = async (reservationId: string): Promise<EmailTemplate[]> =>
  client.get<EmailTemplate[]>(`/car-rental/reservations/${reservationId}/emails/templates`);

export const triggerReservationEmailTemplate = async (
  reservationId: string,
  request: EmailTriggerRequest
): Promise<void> =>
  client.post<void>(`/car-rental/reservations/${reservationId}/emails/trigger`, request);

// Quote emails
export const storeQuoteAndSendEmail = async (quoteData: any): Promise<any> =>
  client.post('/car-rental/quotes/email', quoteData);

export default {
  listEmailTemplates,
  triggerEmailTemplate,
  sendReservationConfirmation,
  sendReservationContract,
  listReservationEmailTemplates,
  triggerReservationEmailTemplate,
  storeQuoteAndSendEmail,
};