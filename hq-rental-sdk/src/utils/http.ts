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
        headers: buildHeaders(extraConfig?.headers as any),
        ...extraConfig,
    });
}

export const request = async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const client = createClient();
    return client.request<T>(config);
};

export const get = async <T = any>(url: string, cfg?: AxiosRequestConfig) =>
    request<T>({ method: 'GET', url, ...cfg });

export const post = async <T = any, U = any>(url: string, data?: U, cfg?: AxiosRequestConfig) =>
    request<T>({ method: 'POST', url, data, ...cfg });

export const put = async <T = any, U = any>(url: string, data?: U, cfg?: AxiosRequestConfig) =>
    request<T>({ method: 'PUT', url, data, ...cfg });

export const del = async <T = any>(url: string, cfg?: AxiosRequestConfig) =>
    request<T>({ method: 'DELETE', url, ...cfg });

export default {
    get,
    post,
    put,
    del,
    setToken,
};