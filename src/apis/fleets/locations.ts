import client from '../../client';

export interface Location {
  id?: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of locations
 */
export const listLocations = async (): Promise<Location[]> =>
  client.get<Location[]>('/fleets/locations');

export default {
  listLocations,
};
