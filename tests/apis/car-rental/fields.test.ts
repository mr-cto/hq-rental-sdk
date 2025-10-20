import * as fieldsAPI from '../../../src/apis/car-rental/fields';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Fields API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listFieldsByItemType', () => {
    it('should call client.get with correct URL and item type', async () => {
      const itemType = 'customer';
      const mockFields = [
        { id: '1', name: 'First Name', type: 'text', required: true },
        { id: '2', name: 'Last Name', type: 'text', required: true }
      ];
      mockClient.get.mockResolvedValue(mockFields);

      const result = await fieldsAPI.listFieldsByItemType(itemType);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields?item_type=customer');
      expect(result).toEqual(mockFields);
    });

    it('should handle special characters in item type', async () => {
      const itemType = 'rental/vehicle%20type';
      const mockFields = [
        { id: '3', name: 'Vehicle Type', type: 'select', required: false, options: ['car', 'truck'] }
      ];
      mockClient.get.mockResolvedValue(mockFields);

      const result = await fieldsAPI.listFieldsByItemType(itemType);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields?item_type=rental/vehicle%20type');
      expect(result).toEqual(mockFields);
    });

    it('should handle empty response', async () => {
      const itemType = 'nonexistent';
      const mockFields: any[] = [];
      mockClient.get.mockResolvedValue(mockFields);

      const result = await fieldsAPI.listFieldsByItemType(itemType);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields?item_type=nonexistent');
      expect(result).toEqual(mockFields);
    });
  });

  describe('getField', () => {
    it('should call client.get with correct URL', async () => {
      const fieldId = 'field-123';
      const mockField = {
        id: fieldId,
        name: 'Email',
        type: 'email',
        required: true
      };
      mockClient.get.mockResolvedValue(mockField);

      const result = await fieldsAPI.getField(fieldId);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/field-123');
      expect(result).toEqual(mockField);
    });

    it('should handle special characters in field ID', async () => {
      const fieldId = 'field-with/special%20chars';
      const mockField = {
        id: fieldId,
        name: 'Special Field',
        type: 'text',
        required: false
      };
      mockClient.get.mockResolvedValue(mockField);

      const result = await fieldsAPI.getField(fieldId);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/field-with/special%20chars');
      expect(result).toEqual(mockField);
    });

    it('should handle field with all optional properties', async () => {
      const fieldId = 'field-full';
      const mockField = {
        id: fieldId,
        name: 'Full Field',
        type: 'select',
        required: true,
        options: ['option1', 'option2', 'option3'],
        item_type: 'vehicle'
      };
      mockClient.get.mockResolvedValue(mockField);

      const result = await fieldsAPI.getField(fieldId);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/field-full');
      expect(result).toEqual(mockField);
    });
  });

  describe('getFieldByType', () => {
    it('should call client.get with correct URL', async () => {
      const fieldType = 'email';
      const mockField = {
        id: 'email-field',
        name: 'Email Address',
        type: fieldType,
        required: true
      };
      mockClient.get.mockResolvedValue(mockField);

      const result = await fieldsAPI.getFieldByType(fieldType);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/type/email');
      expect(result).toEqual(mockField);
    });

    it('should handle special characters in field type', async () => {
      const fieldType = 'custom/special%20type';
      const mockField = {
        id: 'custom-field',
        name: 'Custom Special Field',
        type: fieldType,
        required: false
      };
      mockClient.get.mockResolvedValue(mockField);

      const result = await fieldsAPI.getFieldByType(fieldType);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/type/custom/special%20type');
      expect(result).toEqual(mockField);
    });

    it('should handle complex field type', async () => {
      const fieldType = 'select_multiple';
      const mockField = {
        id: 'multi-select-field',
        name: 'Multiple Selection',
        type: fieldType,
        required: false,
        options: ['value1', 'value2', 'value3']
      };
      mockClient.get.mockResolvedValue(mockField);

      const result = await fieldsAPI.getFieldByType(fieldType);

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/type/select_multiple');
      expect(result).toEqual(mockField);
    });
  });

  describe('listCustomerFields', () => {
    it('should call client.get with correct URL', async () => {
      const mockFields = [
        { id: '1', name: 'First Name', type: 'text', required: true },
        { id: '2', name: 'Last Name', type: 'text', required: true },
        { id: '3', name: 'Email', type: 'email', required: true },
        { id: '4', name: 'Phone', type: 'tel', required: false }
      ];
      mockClient.get.mockResolvedValue(mockFields);

      const result = await fieldsAPI.listCustomerFields();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/customers');
      expect(result).toEqual(mockFields);
    });

    it('should handle empty customer fields', async () => {
      const mockFields: any[] = [];
      mockClient.get.mockResolvedValue(mockFields);

      const result = await fieldsAPI.listCustomerFields();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/customers');
      expect(result).toEqual(mockFields);
    });

    it('should handle customer fields with all properties', async () => {
      const mockFields = [
        {
          id: '1',
          name: 'Customer Type',
          type: 'select',
          required: true,
          options: ['individual', 'business'],
          item_type: 'customer'
        }
      ];
      mockClient.get.mockResolvedValue(mockFields);

      const result = await fieldsAPI.listCustomerFields();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/fields/customers');
      expect(result).toEqual(mockFields);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(fieldsAPI.default).toHaveProperty('listFieldsByItemType');
      expect(fieldsAPI.default).toHaveProperty('getField');
      expect(fieldsAPI.default).toHaveProperty('getFieldByType');
      expect(fieldsAPI.default).toHaveProperty('listCustomerFields');
    });

    it('should have all functions be the same as named exports', () => {
      expect(fieldsAPI.default.listFieldsByItemType).toBe(fieldsAPI.listFieldsByItemType);
      expect(fieldsAPI.default.getField).toBe(fieldsAPI.getField);
      expect(fieldsAPI.default.getFieldByType).toBe(fieldsAPI.getFieldByType);
      expect(fieldsAPI.default.listCustomerFields).toBe(fieldsAPI.listCustomerFields);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from listFieldsByItemType', async () => {
      const error = new Error('Network error');
      mockClient.get.mockRejectedValue(error);

      await expect(fieldsAPI.listFieldsByItemType('customer')).rejects.toThrow('Network error');
    });

    it('should propagate errors from getField', async () => {
      const error = new Error('Field not found');
      mockClient.get.mockRejectedValue(error);

      await expect(fieldsAPI.getField('nonexistent')).rejects.toThrow('Field not found');
    });

    it('should propagate errors from getFieldByType', async () => {
      const error = new Error('Field type not found');
      mockClient.get.mockRejectedValue(error);

      await expect(fieldsAPI.getFieldByType('invalid-type')).rejects.toThrow('Field type not found');
    });

    it('should propagate errors from listCustomerFields', async () => {
      const error = new Error('Server error');
      mockClient.get.mockRejectedValue(error);

      await expect(fieldsAPI.listCustomerFields()).rejects.toThrow('Server error');
    });
  });
});