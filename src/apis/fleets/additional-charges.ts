import client from '../../client';

export interface AdditionalCharge {
  id?: number;
  name: string;
  description?: string;
  amount: number;
  type: string;
  category?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of the additional charges
 */
export const listAdditionalCharges = async (): Promise<AdditionalCharge[]> =>
  client.get<AdditionalCharge[]>('/fleets/additional-charges');

/**
 * Returns a single additional charge
 */
export const getAdditionalCharge = async (id: number): Promise<AdditionalCharge> =>
  client.get<AdditionalCharge>(`/fleets/additional-charges/${id}`);

export default {
  listAdditionalCharges,
  getAdditionalCharge,
};
