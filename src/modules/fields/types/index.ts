// Field types
export interface Field {
    id: number;
    name: string;
    location: string;
    capacity: number;
    price_per_hour: number;
    description?: string;
    opening_time: string;
    closing_time: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    created_by?: number;
}

// Field create/update types
export interface FieldCreate {
    name: string;
    location: string;
    capacity: number;
    price_per_hour: number;
    description?: string;
    opening_time?: string;
    closing_time?: string;
    is_active?: boolean;
}

export interface FieldUpdate {
    name?: string;
    location?: string;
    capacity?: number;
    price_per_hour?: number;
    description?: string;
    opening_time?: string;
    closing_time?: string;
    is_active?: boolean;
}

// Availability types
export interface FieldAvailability {
    field_id: number;
    date: string;
    available_hours: string[];
}

// List response
export interface FieldsListResponse {
    fields: Field[];
    total: number;
    page: number;
    size: number;
}
