'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { dashboardService } from '@/modules/dashboard/services/dashboardService';
import { DashboardUser } from '@/modules/dashboard/types';
import { USERS_COLUMNS } from '@/modules/dashboard/constants/dashboardConstants';
import { Table } from '@/components/ui/Table';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const UsersListView: React.FC = () => {
    const router = useRouter();
    const { token, user } = useAuthStore();
    const [users, setUsers] = useState<DashboardUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current && token) {
            if (user && !user.is_admin) {
                router.push('/dashboard');
                return;
            }
            isMounted.current = true;
        }
    }, [token, user, router]);

    useEffect(() => {
        if (token) {
            loadData();
        }
    }, [token, roleFilter, statusFilter]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const role = roleFilter !== 'all' ? (roleFilter as 'admin' | 'user') : undefined;
            const is_active = statusFilter !== 'all' ? statusFilter === 'active' : undefined;

            const response = await dashboardService.getUsers({
                token: token || undefined,
                role,
                is_active
            });

            if (response.success) {
                console.log('Users response data:', response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else if (response.data && Array.isArray((response.data as any).users)) {
                    setUsers((response.data as any).users);
                } else if (response.data && Array.isArray((response.data as any).items)) {
                    setUsers((response.data as any).items);
                } else {
                    console.error('Unexpected users data format:', response.data);
                    setUsers([]);
                }
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold text-white mb-6">Lista de Usuarios</h1>

                <div className="flex gap-4 mb-6">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="all">Todos los Roles</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>

                <Card variant="glass" padding="lg">
                    <Table
                        data={users}
                        columns={USERS_COLUMNS}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron usuarios"
                    />
                </Card>
            </motion.div>
        </div>
    );
};
