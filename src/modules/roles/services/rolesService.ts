import { http } from '@/lib/http';
import { Role, RoleCreate, RoleUpdate, Permission } from '@/modules/roles/types';
import { ApiResponse } from '@/lib/http';

const BASE_URL = process.env.NEXT_PUBLIC_API_ROLES_URL || 'http://localhost:8001';

const getConfig = (token?: string) => token ? {
    headers: { Authorization: `Bearer ${token}` }
} : undefined;

export const rolesService = {
    // Roles CRUD
    async getAll(token?: string): Promise<ApiResponse<Role[]>> {
        try {
            return await http.get<Role[]>(`${BASE_URL}/roles/roles`, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async getById(id: number, token?: string): Promise<ApiResponse<Role>> {
        try {
            return await http.get<Role>(`${BASE_URL}/roles/roles/${id}`, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async create(data: RoleCreate, token?: string): Promise<ApiResponse<Role>> {
        try {
            return await http.post<Role>(`${BASE_URL}/roles/roles`, data, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async update(id: number, data: RoleUpdate, token?: string): Promise<ApiResponse<Role>> {
        try {
            return await http.patch<Role>(`${BASE_URL}/roles/roles/${id}`, data, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async delete(id: number, token?: string): Promise<ApiResponse<void>> {
        try {
            return await http.delete<void>(`${BASE_URL}/roles/roles/${id}`, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    // Permissions
    async getPermissions(resource?: string, token?: string): Promise<ApiResponse<Permission[]>> {
        try {
            const url = resource ? `${BASE_URL}/roles/permissions?resource=${resource}` : `${BASE_URL}/roles/permissions`;
            return await http.get<Permission[]>(url, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async assignPermissionToRole(roleId: number, permissionId: number, token?: string): Promise<ApiResponse<void>> {
        try {
            return await http.post<void>(`${BASE_URL}/roles/roles/${roleId}/permissions`, { permission_id: permissionId }, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async assignRoleToUser(userId: number, roleId: number, token?: string): Promise<ApiResponse<void>> {
        try {
            return await http.post<void>(`${BASE_URL}/roles/users/${userId}/assign-role`, { role_id: roleId }, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    },

    async getUserPermissions(userId: number, token?: string): Promise<ApiResponse<Permission[]>> {
        try {
            return await http.get<Permission[]>(`${BASE_URL}/roles/users/${userId}/permissions`, getConfig(token));
        } catch (error: any) {
            return error.response;
        }
    }
};
