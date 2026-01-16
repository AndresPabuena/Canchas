export interface Role {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Permission {
    id: number;
    name: string;
    resource: string;
    action: string;
    is_active: boolean;
}

export interface RolePermission {
    role_id: number;
    permission_id: number;
}

export interface UserRole {
    user_id: number;
    role_id: number;
}

export interface RoleCreate {
    name: string;
    description: string;
    is_active?: boolean;
}

export interface RoleUpdate {
    name?: string;
    description?: string;
    is_active?: boolean;
}
