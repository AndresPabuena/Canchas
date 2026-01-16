// User types
export interface User {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
    is_admin: boolean;
}

// Auth request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface UpdateProfileRequest {
    username?: string;
    password?: string;
}

// Auth response types
export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface UserStatsResponse {
    total_users: number;
    active_users: number;
    admin_users: number;
    new_users_today: number;
}

// Users list response
export interface UsersListResponse {
    users: User[];
    total: number;
    page: number;
    size: number;
}
