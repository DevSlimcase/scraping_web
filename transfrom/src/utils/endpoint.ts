import axios, { AxiosInstance, AxiosResponse,InternalAxiosRequestConfig } from 'axios';

class ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 10000, // Set a timeout of 10 seconds
        });

        // Add request interceptor
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                // You can add headers or authentication tokens here
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add response interceptor
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        return this.client.get(url, { params });
    }

    public async post<T>(url: string, data?: any): Promise<T> {
        return this.client.post(url, data);
    }

    public async put<T>(url: string, data?: any): Promise<T> {
        return this.client.put(url, data);
    }

    public async delete<T>(url: string): Promise<T> {
        return this.client.delete(url);
    }
}

export { ApiClient as Client };
export type { ApiClient };