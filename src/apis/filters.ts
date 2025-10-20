import client from '../client';

export interface FilterExample {
  field: string;
  operators: string[];
  example_values?: (string | number | boolean)[];
  description?: string;
}

/**
 * Returns an example of the allowed filters to the API
 */
export const getFilterExamples = async (): Promise<FilterExample[]> =>
  client.get<FilterExample[]>('/filters');

export default {
  getFilterExamples,
};
