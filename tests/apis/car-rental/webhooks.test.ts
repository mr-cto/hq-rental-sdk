import { describe, it, expect, jest } from '@jest/globals';
import * as webhooks from '../../../src/apis/car-rental/webhooks';
import client from '../../../src/client';

// Mock the client
jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Webhooks API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerWebhook', () => {
    it('should call client.post with correct URL and payload', async () => {
      const payload = {
        url: 'https://example.com/webhook',
        events: ['reservation.created', 'payment.completed'],
        secret: 'secret123'
      };
      mockClient.post.mockResolvedValue({});

      await webhooks.registerWebhook(payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/webhooks', payload);
    });
  });

  describe('listWebhooks', () => {
    it('should call client.get with correct URL', async () => {
      mockClient.get.mockResolvedValue([]);

      await webhooks.listWebhooks();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/webhooks');
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(webhooks.default).toHaveProperty('registerWebhook');
      expect(webhooks.default).toHaveProperty('listWebhooks');
      expect(webhooks.default).toHaveProperty('getWebhook');
      expect(webhooks.default).toHaveProperty('updateWebhook');
      expect(webhooks.default).toHaveProperty('deleteWebhook');
    });
  });
});