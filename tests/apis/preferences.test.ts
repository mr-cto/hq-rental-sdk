import preferencesAPI, { getPreferencesByModule } from '../../src/apis/preferences';
import type { ModulePreference } from '../../src/apis/preferences';

// Mock the client module
jest.mock('../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

import client from '../../src/client';
const mockClient = client as jest.Mocked<typeof client>;

describe('Preferences API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPreferencesByModule', () => {
    it('should call client.get with correct URL', async () => {
      const mockPreferences: ModulePreference[] = [
        {
          module: 'billing',
          preferences: {
            auto_charge: true,
            currency: 'USD',
            tax_rate: 0.08,
            payment_terms: 30,
          },
        },
        {
          module: 'notifications',
          preferences: {
            email_enabled: true,
            sms_enabled: false,
            push_enabled: true,
            frequency: 'daily',
          },
        },
      ];
      mockClient.get.mockResolvedValue(mockPreferences);

      const result = await getPreferencesByModule();

      expect(mockClient.get).toHaveBeenCalledWith('/preferences');
      expect(result).toEqual(mockPreferences);
    });

    it('should handle empty preferences', async () => {
      const mockPreferences: ModulePreference[] = [];
      mockClient.get.mockResolvedValue(mockPreferences);

      const result = await getPreferencesByModule();

      expect(mockClient.get).toHaveBeenCalledWith('/preferences');
      expect(result).toEqual([]);
    });

    it('should handle preferences with different value types', async () => {
      const mockPreferences: ModulePreference[] = [
        {
          module: 'ui',
          preferences: {
            theme: 'dark',
            sidebar_collapsed: false,
            items_per_page: 25,
            custom_colors: {
              primary: '#007bff',
              secondary: '#6c757d',
            },
            enabled_features: ['search', 'export', 'import'],
          },
        },
      ];
      mockClient.get.mockResolvedValue(mockPreferences);

      const result = await getPreferencesByModule();

      expect(result).toEqual(mockPreferences);
    });

    it('should handle module with empty preferences', async () => {
      const mockPreferences: ModulePreference[] = [
        {
          module: 'legacy',
          preferences: {},
        },
      ];
      mockClient.get.mockResolvedValue(mockPreferences);

      const result = await getPreferencesByModule();

      expect(result).toEqual(mockPreferences);
    });

    it('should handle complex nested preferences', async () => {
      const mockPreferences: ModulePreference[] = [
        {
          module: 'reporting',
          preferences: {
            default_timezone: 'UTC',
            report_formats: ['pdf', 'csv', 'excel'],
            scheduling: {
              enabled: true,
              max_concurrent: 5,
              cleanup_after_days: 30,
            },
            email_settings: {
              from_address: 'reports@example.com',
              template_id: 'default',
              attachments: true,
            },
          },
        },
      ];
      mockClient.get.mockResolvedValue(mockPreferences);

      const result = await getPreferencesByModule();

      expect(result).toEqual(mockPreferences);
    });
  });

  describe('default export', () => {
    it('should export getPreferencesByModule in default object', () => {
      expect(preferencesAPI).toBeDefined();
      expect(preferencesAPI.getPreferencesByModule).toBe(getPreferencesByModule);
    });

    it('should have getPreferencesByModule be the same as named export', () => {
      expect(preferencesAPI.getPreferencesByModule).toBe(getPreferencesByModule);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from client.get', async () => {
      const error = new Error('Failed to fetch preferences');
      mockClient.get.mockRejectedValue(error);

      await expect(getPreferencesByModule()).rejects.toThrow('Failed to fetch preferences');
      expect(mockClient.get).toHaveBeenCalledWith('/preferences');
    });

    it('should propagate network errors', async () => {
      const networkError = new Error('Network timeout');
      mockClient.get.mockRejectedValue(networkError);

      await expect(getPreferencesByModule()).rejects.toThrow('Network timeout');
    });

    it('should propagate API errors', async () => {
      const apiError = new Error('API Error: 403 Forbidden');
      mockClient.get.mockRejectedValue(apiError);

      await expect(getPreferencesByModule()).rejects.toThrow('API Error: 403 Forbidden');
    });
  });
});
