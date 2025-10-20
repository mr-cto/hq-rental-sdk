// Import functions from sub-modules
import { listContactCategories, getContactCategory } from './contact-categories';
import {
  listContactsByCategoryId,
  createContact,
  getContact,
  updateContact,
  mergeContacts,
} from './contacts';

// Re-export types
export type { ContactCategory } from './contact-categories';
export type { Contact } from './contacts';

// Export functions directly
export { listContactCategories, getContactCategory };
export {
  listContactsByCategoryId as listContactsInCategory,
  createContact,
  getContact,
  updateContact,
  mergeContacts,
};

// Default export with all functions
export default {
  listContactCategories,
  getContactCategory,
  listContactsInCategory: listContactsByCategoryId,
  createContact,
  getContact,
  updateContact,
  mergeContacts,
};
