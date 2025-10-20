import client from '../../client';

export interface FilterExample {
  field: string;
  operators: string[];
  description: string;
  example: string;
}

// Filters
export const getFilterExamples = async (): Promise<FilterExample[]> =>
  client.get<FilterExample[]>('/filters');

export default {
  getFilterExamples,
};