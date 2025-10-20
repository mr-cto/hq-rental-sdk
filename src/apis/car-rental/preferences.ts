import client from '../../client';

export interface Preference {
  id: string;
  module: string;
  key: string;
  value: any;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'object';
  created_at: string;
  updated_at?: string;
}

// Preferences
export const listPreferences = async (module?: string): Promise<Preference[]> => {
  const query = module ? `?module=${encodeURIComponent(module)}` : '';
  return client.get<Preference[]>(`/preferences${query}`);
};

export default {
  listPreferences,
};