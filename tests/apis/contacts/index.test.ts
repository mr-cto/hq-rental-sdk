import * as contactsAPI from '../../../src/apis/contacts';
import type { ContactCategory, Contact } from '../../../src/apis/contacts';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Contacts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Contact Categories', () => {
    describe('listContactCategories', () => {
      it('should call client.get with correct URL', async () => {
        const mockCategories: ContactCategory[] = [
          {
            id: 'cat-1',
            name: 'Vendors',
            description: 'Vendor contacts',
            fields: ['name', 'email', 'phone'],
          },
          {
            id: 'cat-2',
            name: 'Partners',
            description: 'Partner contacts',
          },
        ];
        mockClient.get.mockResolvedValue(mockCategories);

        const result = await contactsAPI.listContactCategories();

        expect(mockClient.get).toHaveBeenCalledWith('/contacts/categories');
        expect(result).toEqual(mockCategories);
      });

      it('should handle empty categories list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await contactsAPI.listContactCategories();

        expect(result).toEqual([]);
      });
    });

    describe('getContactCategory', () => {
      it('should call client.get with correct URL', async () => {
        const mockCategory: ContactCategory = {
          id: 'cat-1',
          name: 'Vendors',
          description: 'Vendor contacts',
          fields: ['name', 'email', 'phone'],
        };
        mockClient.get.mockResolvedValue(mockCategory);

        const result = await contactsAPI.getContactCategory('cat-1');

        expect(mockClient.get).toHaveBeenCalledWith('/contacts/categories/cat-1');
        expect(result).toEqual(mockCategory);
      });

      it('should handle special characters in category ID', async () => {
        mockClient.get.mockResolvedValue({});

        await contactsAPI.getContactCategory('cat@special');

        expect(mockClient.get).toHaveBeenCalledWith('/contacts/categories/cat@special');
      });
    });

    describe('listContactsInCategory', () => {
      it('should call client.get with correct URL', async () => {
        const mockContacts: Contact[] = [
          {
            id: 'contact-1',
            category_id: 'cat-1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            company: 'Acme Corp',
            created_at: '2024-01-01T00:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockContacts);

        const result = await contactsAPI.listContactsInCategory('cat-1');

        expect(mockClient.get).toHaveBeenCalledWith('/contacts/categories/cat-1/contacts');
        expect(result).toEqual(mockContacts);
      });

      it('should handle empty contacts list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await contactsAPI.listContactsInCategory('cat-1');

        expect(result).toEqual([]);
      });
    });
  });

  describe('Contacts', () => {
    describe('createContact', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1987654321',
          company: 'Smith LLC',
          category_id: 'cat-2',
        };
        const mockContact: Contact = {
          ...payload,
          id: 'contact-new',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockContact);

        const result = await contactsAPI.createContact(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/contacts', payload);
        expect(result).toEqual(mockContact);
      });
    });

    describe('getContact', () => {
      it('should call client.get with correct URL', async () => {
        const mockContact: Contact = {
          id: 'contact-1',
          category_id: 'cat-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          company: 'Acme Corp',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.get.mockResolvedValue(mockContact);

        const result = await contactsAPI.getContact('contact-1');

        expect(mockClient.get).toHaveBeenCalledWith('/contacts/contact-1');
        expect(result).toEqual(mockContact);
      });

      it('should handle special characters in contact ID', async () => {
        mockClient.get.mockResolvedValue({});

        await contactsAPI.getContact('contact@special');

        expect(mockClient.get).toHaveBeenCalledWith('/contacts/contact@special');
      });
    });

    describe('updateContact', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload = {
          name: 'Updated John Doe',
          email: 'updated.john@example.com',
          phone: '+1111111111',
          company: 'Updated Acme Corp',
          category_id: 'cat-2',
        };
        const mockContact: Contact = {
          ...payload,
          id: 'contact-1',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.put.mockResolvedValue(mockContact);

        const result = await contactsAPI.updateContact('contact-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/contacts/contact-1', payload);
        expect(result).toEqual(mockContact);
      });
    });

    describe('mergeContacts', () => {
      it('should call client.post with correct URL and payload', async () => {
        const mockContact: Contact = {
          id: 'contact-1',
          category_id: 'cat-1',
          name: 'Merged Contact',
          email: 'merged@example.com',
          phone: '+1234567890',
          company: 'Merged Corp',
          created_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockContact);

        const result = await contactsAPI.mergeContacts('contact-1', 'contact-2');

        expect(mockClient.post).toHaveBeenCalledWith('/contacts/contact-1/merge', {
          secondary_contact_id: 'contact-2',
        });
        expect(result).toEqual(mockContact);
      });
    });
  });

  describe('Default Export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/contacts').default;

      expect(defaultExport).toHaveProperty('listContactCategories');
      expect(defaultExport).toHaveProperty('getContactCategory');
      expect(defaultExport).toHaveProperty('listContactsInCategory');
      expect(defaultExport).toHaveProperty('createContact');
      expect(defaultExport).toHaveProperty('getContact');
      expect(defaultExport).toHaveProperty('updateContact');
      expect(defaultExport).toHaveProperty('mergeContacts');
    });
  });

  describe('Error Handling', () => {
    it('should propagate errors from contact operations', async () => {
      const error = new Error('Contact operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);

      await expect(contactsAPI.listContactCategories()).rejects.toThrow('Contact operation failed');
      await expect(contactsAPI.getContactCategory('cat-1')).rejects.toThrow(
        'Contact operation failed',
      );
      await expect(contactsAPI.listContactsInCategory('cat-1')).rejects.toThrow(
        'Contact operation failed',
      );
      await expect(contactsAPI.createContact({})).rejects.toThrow('Contact operation failed');
      await expect(contactsAPI.getContact('contact-1')).rejects.toThrow('Contact operation failed');
      await expect(contactsAPI.updateContact('contact-1', {})).rejects.toThrow(
        'Contact operation failed',
      );
      await expect(contactsAPI.mergeContacts('contact-1', 'contact-2')).rejects.toThrow(
        'Contact operation failed',
      );
    });
  });
});
