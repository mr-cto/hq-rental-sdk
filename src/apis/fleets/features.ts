import client from '../../client';

export interface Feature {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Shows a list of features
 */
export const listFeatures = async (): Promise<Feature[]> =>
  client.get<Feature[]>('/fleets/features');

/**
 * Returns a single feature
 */
export const getFeature = async (id: number): Promise<Feature> =>
  client.get<Feature>(`/fleets/features/${id}`);

export default {
  listFeatures,
  getFeature,
};
