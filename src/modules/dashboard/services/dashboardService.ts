import { http, ApiResponse } from '@/lib/http';
import {
    DashboardStats,
    FieldsStatsResponse,
    DailyRevenue,
    ServiceHealthResponse,
    DashboardUser,
    DashboardReservation
} from '@/modules/dashboard/types';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:8004';

export const dashboardService = {
    /**
     * Get dashboard statistics (admin)
     */
    async getStats(options?: { token?: string }): Promise<ApiResponse<DashboardStats>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<DashboardStats>(`${DASHBOARD_URL}/dashboard/stats`, config);
    },

    /**
     * Get fields statistics (admin)
     */
    async getFieldsStats(options?: { token?: string }): Promise<ApiResponse<FieldsStatsResponse>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<FieldsStatsResponse>(`${DASHBOARD_URL}/dashboard/fields/stats`, config);
    },

    /**
     * Get daily revenue (admin)
     */
    async getDailyRevenue(options?: { days?: number; token?: string }): Promise<ApiResponse<DailyRevenue[]>> {
        const { days = 30, token } = options || {};
        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : undefined;
        return http.get<DailyRevenue[]>(`${DASHBOARD_URL}/dashboard/revenue/daily?days=${days}`, config);
    },

    /**
     * Check health of all services
     */
    async healthCheck(options?: { token?: string }): Promise<ApiResponse<ServiceHealthResponse>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.get<ServiceHealthResponse>(`${DASHBOARD_URL}/dashboard/health-check`, config);
    },

    /**
     * List users (dashboard)
     */
    async getUsers(options?: { skip?: number; limit?: number; role?: string; is_active?: boolean; token?: string }): Promise<ApiResponse<DashboardUser[]>> {
        const { skip = 0, limit = 20, role, is_active, token } = options || {};

        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (role) params.append('role', role);
        if (is_active !== undefined) params.append('is_active', is_active.toString());

        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : undefined;
        return http.get<DashboardUser[]>(`${DASHBOARD_URL}/dashboard/users?${params.toString()}`, config);
    },

    /**
     * Reservations overview (dashboard)
     */
    async getReservations(options?: { skip?: number; limit?: number; status?: string; field_id?: number; date_from?: string; date_to?: string; token?: string }): Promise<ApiResponse<DashboardReservation[]>> {
        const { skip = 0, limit = 20, status, field_id, date_from, date_to, token } = options || {};

        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (status) params.append('status', status);
        if (field_id) params.append('field_id', field_id.toString());
        if (date_from) params.append('date_from', date_from);
        if (date_to) params.append('date_to', date_to);

        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : undefined;
        return http.get<DashboardReservation[]>(`${DASHBOARD_URL}/dashboard/reservations?${params.toString()}`, config);
    },
};
