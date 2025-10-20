import client from '../../client';

export interface Contact {
  id?: string;
  category_id?: string;
  name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  notes?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * List all contacts of a specific contact category
 */
export const listContactsByCategoryId = async (categoryId: string): Promise<Contact[]> =>
  client.get<Contact[]>(`/contacts/categories/${categoryId}/contacts`);

/**
 * Create a new contact in the application
 */
export const createContact = async (contactData: Partial<Contact>): Promise<Contact> =>
  client.post<Contact>('/contacts', contactData);

/**
 * List a specific contact
 */
export const getContact = async (id: string): Promise<Contact> =>
  client.get<Contact>(`/contacts/${id}`);

/**
 * Update a contact in the application
 */
export const updateContact = async (id: string, contactData: Partial<Contact>): Promise<Contact> =>
  client.put<Contact>(`/contacts/${id}`, contactData);

/**
 * Merge contacts
 */
export const mergeContacts = async (
  primaryContactId: string,
  secondaryContactId: string,
): Promise<Contact> =>
  client.post<Contact>(`/contacts/${primaryContactId}/merge`, {
    secondary_contact_id: secondaryContactId,
  });

export default {
  listContactsByCategoryId,
  createContact,
  getContact,
  updateContact,
  mergeContacts,
};
