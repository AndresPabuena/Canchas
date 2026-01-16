import { http, ApiResponse } from '@/lib/http';
import {
    User,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UpdateProfileRequest,
    UserStatsResponse,
    UsersListResponse
} from '@/modules/auth/types';

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8000';

export const authService = {
    /**
     * Login user and get JWT token
     */
    async login(credentials: LoginRequest): Promise<ApiResponse<TokenResponse>> {
        return http.post<TokenResponse>(`${AUTH_URL}/auth/login`, credentials);
    },

    /**
     * Register new user
     */
    async register(data: RegisterRequest): Promise<ApiResponse<User>> {
        return http.post<User>(`${AUTH_URL}/auth/register`, data);
    },

    /**
     * Get current authenticated user
     */
    async getMe(options?: { token?: string }): Promise<ApiResponse<User>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<User>(`${AUTH_URL}/auth/me`, config);
    },

    /**
     * Verify token validity
     */
    async verify(options?: { token?: string }): Promise<ApiResponse<{ valid: boolean; user_id: number }>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<{ valid: boolean; user_id: number }>(`${AUTH_URL}/auth/verify`, config);
    },

    /**
     * Update user profile
     */
    async updateProfile(data: UpdateProfileRequest, options?: { token?: string }): Promise<ApiResponse<User>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.patch<User>(`${AUTH_URL}/auth/profile`, data, config);
    },

    /**
     * Request password recovery
     */
    async passwordRecovery(email: string): Promise<ApiResponse<{ message: string }>> {
        return http.post<{ message: string }>(`${AUTH_URL}/auth/password-recovery`, { email });
    },

    /**
     * Get all users (admin only)
     */
    async getUsers(options?: { skip?: number; limit?: number; role?: 'admin' | 'user'; is_active?: boolean; token?: string }): Promise<ApiResponse<UsersListResponse>> {
        const { skip = 0, limit = 20, role, is_active, token } = options || {};

        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (role) params.append('role', role);
        if (is_active !== undefined) params.append('is_active', is_active.toString());

        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : undefined;
        return http.get<UsersListResponse>(`${AUTH_URL}/auth/users?${params.toString()}`, config);
    },

    /**
     * Get users statistics (admin only)
     */
    async getUserStats(options?: { token?: string }): Promise<ApiResponse<UserStatsResponse>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<UserStatsResponse>(`${AUTH_URL}/auth/users/stats`, config);
    },

    /**
     * Get user by ID
     */
    async getUserById(id: number, options?: { token?: string }): Promise<ApiResponse<User>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<User>(`${AUTH_URL}/auth/user/${id}`, config);
    },

    /**
     * Register admin user (admin only)
     */
    async registerAdmin(data: RegisterRequest, options?: { token?: string }): Promise<ApiResponse<User>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.post<User>(`${AUTH_URL}/auth/register-admin`, data, config);
    },
};
