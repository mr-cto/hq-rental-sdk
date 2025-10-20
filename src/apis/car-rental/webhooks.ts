import client from '../../client';

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
}

// Webhooks
export const registerWebhook = async (payload: {
  url: string;
  events: string[];
  secret?: string;
}): Promise<Webhook> => client.post<Webhook>('/car-rental/webhooks', payload);

export const listWebhooks = async (): Promise<Webhook[]> =>
  client.get<Webhook[]>('/car-rental/webhooks');

export const getWebhook = async (webhookId: string): Promise<Webhook> =>
  client.get<Webhook>(`/car-rental/webhooks/${webhookId}`);

export const updateWebhook = async (
  webhookId: string,
  payload: Partial<Webhook>,
): Promise<Webhook> => client.put<Webhook>(`/car-rental/webhooks/${webhookId}`, payload);

export const deleteWebhook = async (webhookId: string): Promise<void> =>
  client.delete(`/car-rental/webhooks/${webhookId}`);

export default {
  registerWebhook,
  listWebhooks,
  getWebhook,
  updateWebhook,
  deleteWebhook,
};
