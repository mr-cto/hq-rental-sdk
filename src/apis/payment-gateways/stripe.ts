import client from '../../client';

export interface StripeLocation {
  id: string;
  display_name: string;
  address: any;
  gateway_id: string;
}

export interface ConnectionToken {
  token: string;
  expires_at: string;
}

/**
 * Shows a list of stripe locations per gateway
 */
export const listStripeLocations = async (gatewayId: string): Promise<StripeLocation[]> =>
  client.get<StripeLocation[]>(`/payment-gateways/${gatewayId}/stripe/locations`);

/**
 * Returns a connection token for a given location
 */
export const getConnectionTokenForLocation = async (locationId: string): Promise<ConnectionToken> =>
  client.get<ConnectionToken>(`/payment-gateways/stripe/locations/${locationId}/connection-token`);

/**
 * Returns a connection token for stripe terminal
 */
export const getStripeTerminalConnectionToken = async (): Promise<ConnectionToken> =>
  client.get<ConnectionToken>('/payment-gateways/stripe/terminal/connection-token');

export default {
  listStripeLocations,
  getConnectionTokenForLocation,
  getStripeTerminalConnectionToken,
};
