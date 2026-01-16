// Dashboard stats types
export interface GeneralStats {
    total_users: number;
    total_fields: number;
    active_fields: number;
    total_reservations: number;
    active_reservations: number;
    cancelled_reservations: number;
    reservations_today?: number;
    total_revenue: number;
}

export interface RecentActivity {
    latest_reservations: any[];
    latest_cancelled: any[];
}

export interface DashboardStats {
    general_stats: GeneralStats;
    recent_activity?: RecentActivity;
    last_updated?: string;
}

export interface FieldStats {
    field_id: number;
    field_name: string;
    field_location: string;
    is_active: boolean;
    total_reservations: number;
    confirmed_reservations: number;
    cancelled_reservations: number;
    weekly_reservations: number;
    total_revenue: number;
    average_price: number;
    capacity: number;
}

export interface FieldsSummary {
    total_fields: number;
    active_fields: number;
    total_revenue: number;
    most_popular_field?: FieldStats;
}

export interface FieldsStatsResponse {
    fields_statistics: FieldStats[];
    summary: FieldsSummary;
}

export interface DailyRevenue {
    date: string;
    revenue: number;
    reservations: number;
}

export interface HealthCheck {
    service: string;
    status: 'healthy' | 'unhealthy';
    response_time?: number;
    latency_ms?: number;
    status_code?: number;
}

export interface DashboardUser {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
    is_admin: boolean;
    created_at: string;
    last_login: string | null;
}

export interface DashboardReservation {
    id: number;
    field_name: string;
    user_email: string;
    start_time: string;
    end_time: string;
    status: string;
    total_price: number;
    created_at: string;
}

export interface ServiceHealthResponse {
    services: HealthCheck[];
    overall_status: 'healthy' | 'degraded' | 'unhealthy';
}
