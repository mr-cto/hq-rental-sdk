import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS } from '../config';

let token: string | null = null;

export function setToken(t: string | null) {
  token = t;
}

function buildHeaders(extra?: Record<string, string>) {
  const headers: Record<string, string> = { ...DEFAULT_HEADERS, ...(extra || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function createClient(extraConfig?: AxiosRequestConfig): AxiosInstance {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: buildHeaders(extraConfig?.headers as Record<string, string> | undefined),
    ...extraConfig,
  });
}

export const request = async <T = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const client = createClient();
  return client.request<T>(config);
};

export const get = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => request<T>({ method: 'GET', url, ...config });

export const post = async <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => request<T>({ method: 'POST', url, data, ...config });

export const put = async <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => request<T>({ method: 'PUT', url, data, ...config });

export const del = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => request<T>({ method: 'DELETE', url, ...config });

export default {
  get,
  post,
  put,
  del,
  setToken,
};
