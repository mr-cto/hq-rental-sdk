import client from '../client';

export interface ModulePreference {
  module: string;
  preferences: Record<string, string | number | boolean | object>;
}

/**
 * Show a list of all preferences per module
 */
export const getPreferencesByModule = async (): Promise<ModulePreference[]> =>
  client.get<ModulePreference[]>('/preferences');

export default {
  getPreferencesByModule,
};
