import client from '../../client';

export interface ContactCategory {
  id: string;
  name: string;
  description?: string;
  fields?: string[];
}

export interface Contact {
  id: string;
  category_id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  created_at: string;
}

// Contacts
export const listContactCategories = async (): Promise<ContactCategory[]> =>
  client.get<ContactCategory[]>('/contacts/categories');

export const getContactCategory = async (categoryId: string): Promise<ContactCategory> =>
  client.get<ContactCategory>(`/contacts/categories/${categoryId}`);

export const listContactsInCategory = async (categoryId: string): Promise<Contact[]> =>
  client.get<Contact[]>(`/contacts/categories/${categoryId}/contacts`);

export const createContact = async (payload: Partial<Contact>): Promise<Contact> =>
  client.post<Contact>('/contacts', payload);

export const getContact = async (contactId: string): Promise<Contact> =>
  client.get<Contact>(`/contacts/${contactId}`);

export const updateContact = async (contactId: string, payload: Partial<Contact>): Promise<Contact> =>
  client.put<Contact>(`/contacts/${contactId}`, payload);

export const mergeContacts = async (primaryContactId: string, secondaryContactId: string): Promise<Contact> =>
  client.post<Contact>(`/contacts/${primaryContactId}/merge`, { secondary_contact_id: secondaryContactId });

export default {
  listContactCategories,
  getContactCategory,
  listContactsInCategory,
  createContact,
  getContact,
  updateContact,
  mergeContacts,
};