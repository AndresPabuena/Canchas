import { http, ApiResponse } from '@/lib/http';
import {
    Reservation,
    CreateReservationRequest,
    UpdateReservationRequest,
    CancelReservationRequest,
    ReservationsListResponse,
    ReservationStatsResponse
} from '@/modules/reservations/types';

const RESERVATIONS_URL = process.env.NEXT_PUBLIC_RESERVATIONS_URL || 'http://localhost:8003';

export const reservationService = {
    /**
     * Get all reservations (admin)
     */
    async getAll(options?: { skip?: number; limit?: number; status?: string; field_id?: number; user_id?: number; token?: string }): Promise<ApiResponse<ReservationsListResponse>> {
        const { skip = 0, limit = 50, status, field_id, user_id, token } = options || {};

        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (status) params.append('status', status);
        if (field_id) params.append('field_id', field_id.toString());
        if (user_id) params.append('user_id', user_id.toString());

        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        return http.get<ReservationsListResponse>(`${RESERVATIONS_URL}/reservations?${params.toString()}`, config);
    },

    /**
     * Get current user's reservations
     */
    async getMyReservations(options?: { skip?: number; limit?: number; status?: string; token?: string }): Promise<ApiResponse<ReservationsListResponse>> {
        const { skip = 0, limit = 50, status, token } = options || {};

        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (status) params.append('status', status);

        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        return http.get<ReservationsListResponse>(`${RESERVATIONS_URL}/reservations/my?${params.toString()}`, config);
    },

    /**
     * Get reservation by ID
     */
    async getById(id: number, options?: { token?: string }): Promise<ApiResponse<Reservation>> {
        const config = options?.token ? { headers: { Authorization: `Bearer ${options.token}` } } : undefined;
        return http.get<Reservation>(`${RESERVATIONS_URL}/reservations/${id}`, config);
    },

    /**
     * Create a new reservation
     */
    async create(data: CreateReservationRequest, options?: { token?: string }): Promise<ApiResponse<Reservation>> {
        const config = options?.token ? { headers: { Authorization: `Bearer ${options.token}` } } : undefined;
        return http.post<Reservation>(`${RESERVATIONS_URL}/reservations/`, data, config);
    },

    /**
     * Update a reservation
     */
    async update(id: number, data: UpdateReservationRequest, options?: { token?: string }): Promise<ApiResponse<Reservation>> {
        const config = options?.token ? { headers: { Authorization: `Bearer ${options.token}` } } : undefined;
        return http.put<Reservation>(`${RESERVATIONS_URL}/reservations/${id}`, data, config);
    },

    /**
     * Cancel a reservation
     */
    async cancel(id: number, data?: CancelReservationRequest, options?: { token?: string }): Promise<ApiResponse<Reservation>> {
        const config = options?.token ? { headers: { Authorization: `Bearer ${options.token}` } } : undefined;
        return http.post<Reservation>(`${RESERVATIONS_URL}/reservations/${id}/cancel`, data || {}, config);
    },

    /**
     * Get reservation statistics (admin)
     */
    async getStats(options?: { token?: string }): Promise<ApiResponse<ReservationStatsResponse>> {
        const config = options?.token ? { headers: { Authorization: `Bearer ${options.token}` } } : undefined;
        return http.get<ReservationStatsResponse>(`${RESERVATIONS_URL}/reservations/stats`, config);
    },

    /**
     * Get reservations for a specific field on a date
     */
    async getFieldReservations(fieldId: number, date: string): Promise<ApiResponse<Reservation[]>> {
        return http.get<Reservation[]>(`${RESERVATIONS_URL}/reservations/field/${fieldId}/date/${date}`);
    },
};
