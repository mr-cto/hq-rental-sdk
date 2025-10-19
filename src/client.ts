import http from './utils/http';

export class HQRentalClient {
    async request<T = any>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any) {
        switch (method) {
            case 'get':
                return (await http.get<T>(url)).data;
            case 'post':
                return (await http.post<T>(url, data)).data;
            case 'put':
                return (await http.put<T>(url, data)).data;
            case 'delete':
                return (await http.del<T>(url)).data;
            default:
                throw new Error('Unsupported method');
        }
    }

    // Convenience helpers
    get<T = any>(url: string) {
        return this.request<T>('get', url);
    }
    post<T = any>(url: string, data?: any) {
        return this.request<T>('post', url, data);
    }
    put<T = any>(url: string, data?: any) {
        return this.request<T>('put', url, data);
    }
    delete<T = any>(url: string) {
        return this.request<T>('delete', url);
    }
}

export const client = new HQRentalClient();

export default client;