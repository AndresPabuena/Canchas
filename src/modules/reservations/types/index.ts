// Reservation status enum
export type ReservationStatus = 'confirmada' | 'cancelada';

// Reservation types
export interface Reservation {
    id: number;
    user_id: number;
    field_id: number;
    field_name: string;
    field_location: string;
    start_time: string;
    end_time: string;
    duration_hours: number;
    total_price: number;
    status: ReservationStatus;
    notes?: string;
    created_at: string;
    updated_at: string;
    cancelled_at?: string;
    cancelled_by?: number;
}

// Create reservation request
export interface CreateReservationRequest {
    field_id: number;
    start_time: string; // ISO format: "2026-01-20T14:00:00"
    duration_hours: 1 | 2;
    notes?: string;
}

// Update reservation request
export interface UpdateReservationRequest {
    start_time?: string;
    duration_hours?: 1 | 2;
    notes?: string;
}

// Cancel reservation request
export interface CancelReservationRequest {
    reason?: string;
}

// List response
export interface ReservationsListResponse {
    reservations: Reservation[];
    total: number;
    page: number;
    size: number;
}

// Stats response (admin)
export interface ReservationStatsResponse {
    total_reservations: number;
    active_reservations: number;
    cancelled_reservations: number;
    reservations_today: number;
    total_revenue: number;
}
