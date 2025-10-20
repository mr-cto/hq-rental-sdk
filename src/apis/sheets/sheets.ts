import client from '../../client';

export interface Sheet {
  id?: string;
  name: string;
  description?: string;
  type?: string;
  template?: any;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  item_count?: number;
}

/**
 * Show a list of all sheets
 */
export const listSheets = async (params?: Record<string, any>): Promise<Sheet[]> => {
  if (params) {
    const query = new URLSearchParams(params).toString();
    return client.get<Sheet[]>(`/sheets?${query}`);
  }
  return client.get<Sheet[]>('/sheets');
};

export default {
  listSheets,
};
