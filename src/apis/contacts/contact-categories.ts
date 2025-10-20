import client from '../../client';

export interface ContactCategory {
  id?: string;
  name: string;
  description?: string;
  active?: boolean;
  fields?: string[];
  created_at?: string;
  updated_at?: string;
}

/**
 * List all contact categories
 */
export const listContactCategories = async (): Promise<ContactCategory[]> =>
  client.get<ContactCategory[]>('/contacts/categories');

/**
 * List a specific contact category
 */
export const getContactCategory = async (id: string): Promise<ContactCategory> =>
  client.get<ContactCategory>(`/contacts/categories/${id}`);

export default {
  listContactCategories,
  getContactCategory,
};
