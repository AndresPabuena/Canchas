import { http, ApiResponse } from '@/lib/http';
import {
    Field,
    FieldCreate,
    FieldUpdate,
    FieldAvailability,
    FieldsListResponse
} from '@/modules/fields/types';

const FIELDS_URL = process.env.NEXT_PUBLIC_FIELDS_URL || 'http://localhost:8002';

export const fieldService = {
    /**
     * Get all fields with pagination
     */
    async getAll(options?: { skip?: number; limit?: number; is_active?: boolean }): Promise<ApiResponse<FieldsListResponse>> {
        const { skip = 0, limit = 50, is_active } = options || {};

        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (is_active !== undefined) params.append('is_active', is_active.toString());

        return http.get<FieldsListResponse>(`${FIELDS_URL}/fields?${params.toString()}`);
    },

    /**
     * Get field by ID
     */
    async getById(id: number): Promise<ApiResponse<Field>> {
        return http.get<Field>(`${FIELDS_URL}/fields/${id}`);
    },

    /**
     * Get field availability for a specific date
     */
    async getAvailability(fieldId: number, date: string): Promise<ApiResponse<FieldAvailability>> {
        return http.get<FieldAvailability>(`${FIELDS_URL}/fields/${fieldId}/availability?date=${date}`);
    },

    /**
     * Create a new field (admin only)
     */
    async create(data: FieldCreate, options?: { token?: string }): Promise<ApiResponse<Field>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.post<Field>(`${FIELDS_URL}/fields/`, data, config);
    },

    /**
     * Update a field (admin only)
     */
    async update(id: number, data: FieldUpdate, options?: { token?: string }): Promise<ApiResponse<Field>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.patch<Field>(`${FIELDS_URL}/fields/${id}`, data, config);
    },

    /**
     * Delete a field (admin only)
     */
    async delete(id: number, options?: { token?: string }): Promise<ApiResponse<void>> {
        const config = options?.token
            ? { headers: { Authorization: `Bearer ${options.token}` } }
            : undefined;
        return http.delete<void>(`${FIELDS_URL}/fields/${id}`, config);
    },
};
