'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { dashboardService } from '@/modules/dashboard/services/dashboardService';
import { DashboardReservation } from '@/modules/dashboard/types';
import { RESERVATIONS_COLUMNS } from '@/modules/dashboard/constants/dashboardConstants';
import { Table } from '@/components/ui/Table';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReservationsOverviewView: React.FC = () => {
    const router = useRouter();
    const { token, user } = useAuthStore();
    const [reservations, setReservations] = useState<DashboardReservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
    }, [token, statusFilter]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const status = statusFilter !== 'all' ? statusFilter : undefined;

            const response = await dashboardService.getReservations({
                token: token || undefined,
                status
            });

            if (response.success) {
                console.log('Reservations response data:', response.data);
                if (Array.isArray(response.data)) {
                    setReservations(response.data);
                } else if (response.data && Array.isArray((response.data as any).reservations)) {
                    setReservations((response.data as any).reservations);
                } else if (response.data && Array.isArray((response.data as any).items)) {
                    setReservations((response.data as any).items);
                } else {
                    console.error('Unexpected reservations data format:', response.data);
                    setReservations([]);
                }
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setReservations([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Columns defined in constants file

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
                <h1 className="text-2xl font-bold text-white mb-6">Resumen de Reservas</h1>

                <div className="flex gap-4 mb-6">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>

                <Card variant="glass" padding="lg">
                    <Table
                        data={reservations}
                        columns={RESERVATIONS_COLUMNS}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron reservas"
                    />
                </Card>
            </motion.div>
        </div>
    );
};
