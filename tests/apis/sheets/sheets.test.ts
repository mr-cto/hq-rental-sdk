import * as sheetsAPI from '../../../src/apis/sheets';
import type {
  Sheet,
  SheetItem,
  CreateSheetItemPayload,
  UpdateSheetItemPayload,
} from '../../../src/apis/sheets';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Sheets API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Sheet Management', () => {
    describe('listSheets', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockSheets: Sheet[] = [
          {
            id: 'sheet-1',
            name: 'Pricing Sheet',
            description: 'Main pricing configuration',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            item_count: 10,
          },
          {
            id: 'sheet-2',
            name: 'Additional Services',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            item_count: 5,
          },
        ];
        mockClient.get.mockResolvedValue(mockSheets);

        const result = await sheetsAPI.listSheets();

        expect(mockClient.get).toHaveBeenCalledWith('/sheets');
        expect(result).toEqual(mockSheets);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { active: 'true', category: 'pricing' };
        mockClient.get.mockResolvedValue([]);

        await sheetsAPI.listSheets(params);

        expect(mockClient.get).toHaveBeenCalledWith('/sheets?active=true&category=pricing');
      });

      it('should handle empty params object', async () => {
        mockClient.get.mockResolvedValue([]);

        await sheetsAPI.listSheets({});

        expect(mockClient.get).toHaveBeenCalledWith('/sheets?');
      });
    });
  });

  describe('Sheet Items Management', () => {
    describe('listSheetItems', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockItems: SheetItem[] = [
          {
            id: 'item-1',
            sheet_id: 'sheet-1',
            name: 'Basic Rate',
            description: 'Daily base rate',
            category: 'rates',
            price: 50.0,
            quantity: 1,
            unit: 'day',
            active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          {
            id: 'item-2',
            sheet_id: 'sheet-1',
            name: 'GPS Navigation',
            description: 'GPS device rental',
            category: 'equipment',
            price: 10.0,
            quantity: 1,
            unit: 'day',
            active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockItems);

        const result = await sheetsAPI.listSheetItems('sheet-1');

        expect(mockClient.get).toHaveBeenCalledWith('/sheets/sheet-1/items');
        expect(result).toEqual(mockItems);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { active: 'true', category: 'equipment' };
        mockClient.get.mockResolvedValue([]);

        await sheetsAPI.listSheetItems('sheet-1', params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/sheets/sheet-1/items?active=true&category=equipment',
        );
      });

      it('should handle special characters in sheet ID', async () => {
        mockClient.get.mockResolvedValue([]);

        await sheetsAPI.listSheetItems('sheet@special');

        expect(mockClient.get).toHaveBeenCalledWith('/sheets/sheet@special/items');
      });
    });

    describe('getSheetItem', () => {
      it('should call client.get with correct URL', async () => {
        const mockItem: SheetItem = {
          id: 'item-1',
          sheet_id: 'sheet-1',
          name: 'Basic Rate',
          description: 'Daily base rate',
          category: 'rates',
          price: 50.0,
          quantity: 1,
          unit: 'day',
          active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        };
        mockClient.get.mockResolvedValue(mockItem);

        const result = await sheetsAPI.getSheetItem('sheet-1', 'item-1');

        expect(mockClient.get).toHaveBeenCalledWith('/sheets/sheet-1/items/item-1');
        expect(result).toEqual(mockItem);
      });

      it('should handle special characters in IDs', async () => {
        mockClient.get.mockResolvedValue({ id: 'item@special' });

        await sheetsAPI.getSheetItem('sheet@special', 'item@special');

        expect(mockClient.get).toHaveBeenCalledWith('/sheets/sheet@special/items/item@special');
      });
    });

    describe('createSheetItem', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: CreateSheetItemPayload = {
          name: 'New Item',
          description: 'A new sheet item',
          category: 'equipment',
          price: 25.0,
          quantity: 1,
          unit: 'day',
          active: true,
          custom_fields: { color: 'blue', size: 'medium' },
        };
        const mockItem: SheetItem = {
          id: 'item-new',
          sheet_id: 'sheet-1',
          name: 'New Item',
          description: 'A new sheet item',
          category: 'equipment',
          price: 25.0,
          quantity: 1,
          unit: 'day',
          active: true,
          custom_fields: { color: 'blue', size: 'medium' },
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockItem);

        const result = await sheetsAPI.createSheetItem('sheet-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/sheets/sheet-1/items', payload);
        expect(result).toEqual(mockItem);
      });

      it('should handle minimal payload', async () => {
        const payload: CreateSheetItemPayload = {
          name: 'Minimal Item',
        };
        const mockItem: SheetItem = {
          id: 'item-minimal',
          sheet_id: 'sheet-1',
          name: 'Minimal Item',
          active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        };
        mockClient.post.mockResolvedValue(mockItem);

        await sheetsAPI.createSheetItem('sheet-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/sheets/sheet-1/items', payload);
      });
    });

    describe('updateSheetItem', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: UpdateSheetItemPayload = {
          name: 'Updated Item',
          price: 30.0,
          active: false,
        };
        const mockItem: SheetItem = {
          id: 'item-1',
          sheet_id: 'sheet-1',
          name: 'Updated Item',
          description: 'Original description',
          category: 'equipment',
          price: 30.0,
          quantity: 1,
          unit: 'day',
          active: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
        };
        mockClient.put.mockResolvedValue(mockItem);

        const result = await sheetsAPI.updateSheetItem('sheet-1', 'item-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/sheets/sheet-1/items/item-1', payload);
        expect(result).toEqual(mockItem);
      });

      it('should handle empty payload', async () => {
        const payload: UpdateSheetItemPayload = {};
        mockClient.put.mockResolvedValue({ id: 'item-1' });

        await sheetsAPI.updateSheetItem('sheet-1', 'item-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/sheets/sheet-1/items/item-1', payload);
      });
    });
  });

  describe('Error Handling', () => {
    it('should propagate errors from sheet operations', async () => {
      const error = new Error('Sheet operation failed');
      mockClient.get.mockRejectedValue(error);

      await expect(sheetsAPI.listSheets()).rejects.toThrow('Sheet operation failed');
    });

    it('should propagate errors from sheet item operations', async () => {
      const error = new Error('Sheet item operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);

      await expect(sheetsAPI.listSheetItems('sheet-1')).rejects.toThrow(
        'Sheet item operation failed',
      );
      await expect(sheetsAPI.getSheetItem('sheet-1', 'item-1')).rejects.toThrow(
        'Sheet item operation failed',
      );
      await expect(sheetsAPI.createSheetItem('sheet-1', { name: 'Test' })).rejects.toThrow(
        'Sheet item operation failed',
      );
      await expect(sheetsAPI.updateSheetItem('sheet-1', 'item-1', {})).rejects.toThrow(
        'Sheet item operation failed',
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined or null parameters gracefully', async () => {
      mockClient.get.mockResolvedValue([]);

      await sheetsAPI.listSheets(undefined);
      expect(mockClient.get).toHaveBeenCalledWith('/sheets');

      await sheetsAPI.listSheetItems('sheet-1', undefined);
      expect(mockClient.get).toHaveBeenCalledWith('/sheets/sheet-1/items');
    });

    it('should handle numeric IDs as strings', async () => {
      mockClient.get.mockResolvedValue({ id: '123' });

      await sheetsAPI.getSheetItem('123', '456');

      expect(mockClient.get).toHaveBeenCalledWith('/sheets/123/items/456');
    });

    it('should handle custom fields in create and update operations', async () => {
      const createPayload: CreateSheetItemPayload = {
        name: 'Custom Item',
        custom_fields: {
          metadata: { version: '1.0' },
          tags: ['important', 'featured'],
          settings: { visible: true, sortOrder: 10 },
        },
      };
      mockClient.post.mockResolvedValue({ id: 'item-custom' });

      await sheetsAPI.createSheetItem('sheet-1', createPayload);

      expect(mockClient.post).toHaveBeenCalledWith('/sheets/sheet-1/items', createPayload);

      const updatePayload: UpdateSheetItemPayload = {
        custom_fields: {
          metadata: { version: '2.0' },
          newField: 'new value',
        },
      };
      mockClient.put.mockResolvedValue({ id: 'item-custom' });

      await sheetsAPI.updateSheetItem('sheet-1', 'item-custom', updatePayload);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/sheets/sheet-1/items/item-custom',
        updatePayload,
      );
    });
  });
});
