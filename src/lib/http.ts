import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// API Response wrapper
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

// Error response structure
export interface ApiError {
    detail?: string;
    message?: string;
}

// HTTP Client Singleton
class HttpClient {
    private static instance: HttpClient;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor to add token
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = Cookies.get('access_token');
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid - clear auth data
                    Cookies.remove('access_token');
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    // GET request
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.get<T>(url, config);
            return { data: response.data, success: true };
        } catch (error: unknown) {
            return this.handleError<T>(error);
        }
    }

    // POST request
    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.post<T>(url, data, config);
            return { data: response.data, success: true };
        } catch (error: unknown) {
            return this.handleError<T>(error);
        }
    }

    // PUT request
    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.put<T>(url, data, config);
            return { data: response.data, success: true };
        } catch (error: unknown) {
            return this.handleError<T>(error);
        }
    }

    // PATCH request
    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.patch<T>(url, data, config);
            return { data: response.data, success: true };
        } catch (error: unknown) {
            return this.handleError<T>(error);
        }
    }

    // DELETE request
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.delete<T>(url, config);
            return { data: response.data, success: true };
        } catch (error: unknown) {
            return this.handleError<T>(error);
        }
    }

    // Error handler
    private handleError<T>(error: unknown): ApiResponse<T> {
        if (axios.isAxiosError(error)) {
            let message = error.response?.data?.message || error.message;
            const detail = error.response?.data?.detail;

            if (Array.isArray(detail)) {
                // Handle Pydantic array errors
                message = detail.map((err: any) => err.msg).join('\n');
            } else if (typeof detail === 'string') {
                // Handle simple string detail
                message = detail;
            }

            // Clean up common error prefixes
            if (message && typeof message === 'string') {
                message = message.replace('Value error, ', '');
            }

            return {
                data: error.response?.data as T,
                success: false,
                message,
            };
        }
        return {
            data: {} as T,
            success: false,
            message: 'Unknown error occurred',
        };
    }

    // Method to set token manually (useful for when token is passed as prop)
    setToken(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Method to clear token
    clearToken(): void {
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
}

// Export singleton instance
export const http = HttpClient.getInstance();
