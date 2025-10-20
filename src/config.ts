export const API_BASE_URL = 'https://api.hqrentalsoftware.com';

export const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
};

export type Config = {
  baseUrl?: string;
  headers?: Record<string, string>;
};

export default {
  API_BASE_URL,
  DEFAULT_HEADERS,
};
