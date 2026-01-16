'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    Activity,
    CheckCircle,
    XCircle,
    AlertTriangle
} from 'lucide-react';
import { MainLoader } from '@/components/ui/MainLoader';
import { Card, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { dashboardService } from '@/modules/dashboard/services/dashboardService';
import { DashboardStats, FieldStats, ServiceHealthResponse, DailyRevenue } from '@/modules/dashboard/types';
import { FieldStatsList } from '@/modules/dashboard/components/FieldStatsList';
import { RevenueChart } from '@/modules/dashboard/components/RevenueChart';

export const AdminDashboardView: React.FC = () => {
    const { user, token } = useAuthStore();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [fieldStats, setFieldStats] = useState<FieldStats[]>([]);
    const [health, setHealth] = useState<ServiceHealthResponse | null>(null);
    const [revenueData, setRevenueData] = useState<DailyRevenue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRevenueLoading, setIsRevenueLoading] = useState(true);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current || !token) return;
        isMounted.current = true;

        const loadData = async () => {
            setIsLoading(true);
            setIsRevenueLoading(true);

            const [statsRes, fieldsRes, healthRes, revenueRes] = await Promise.all([
                dashboardService.getStats({ token }),
                dashboardService.getFieldsStats({ token }),
                dashboardService.healthCheck({ token }),
                dashboardService.getDailyRevenue({ days: 30, token }),
            ]);

            if (statsRes.success) setStats(statsRes.data);
            if (fieldsRes.success) setFieldStats(fieldsRes.data.fields_statistics);
            if (healthRes.success) {
                setHealth(healthRes.data);
            }
            if (revenueRes.success && revenueRes.data) {
                // Transform the object response to array format for the chart
                const revenueObj = revenueRes.data as any;
                if (revenueObj.daily_revenue) {
                    const transformedData = Object.entries(revenueObj.daily_revenue)
                        .map(([date, revenue]) => ({
                            date,
                            revenue: revenue as number,
                            reservations: 0 // API doesn't provide this, we could fetch separately
                        }))
                        .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date ascending
                    setRevenueData(transformedData);
                } else if (Array.isArray(revenueRes.data)) {
                    setRevenueData(revenueRes.data);
                }
            }

            setIsLoading(false);
            setIsRevenueLoading(false);
        };

        loadData();
        loadData();
    }, [token]);

    // Real-time System Status Polling
    useEffect(() => {
        if (!token) return;

        const pollHealth = async () => {
            const healthRes = await dashboardService.healthCheck({ token });
            if (healthRes.success) {
                setHealth(healthRes.data);
            }
        };

        // Poll every 10 seconds
        const intervalId = setInterval(pollHealth, 10000);


        return () => clearInterval(intervalId);
    }, [token]);



    const statCards = stats ? [
        { label: 'Usuarios Totales', value: stats.general_stats.total_users, icon: Users, color: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/25' },
        { label: 'Canchas Activas', value: stats.general_stats.active_fields, icon: MapPin, color: 'from-emerald-500 to-green-500', shadow: 'shadow-emerald-500/25' },
        { label: 'Reservas Activas', value: stats.general_stats.active_reservations, icon: Calendar, color: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/25' },
        { label: 'Ingresos Totales', value: `$${stats.general_stats.total_revenue?.toLocaleString() || 0}`, icon: DollarSign, color: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/25' },
    ] : [];

    const getHealthIcon = (status: string) => {
        if (status === 'healthy') return <CheckCircle className="text-emerald-400" size={18} />;
        if (status === 'degraded') return <AlertTriangle className="text-amber-400" size={18} />;
        return <XCircle className="text-red-400" size={18} />;
    };

    // Safe extraction of services
    const servicesList = React.useMemo(() => {
        if (!health?.services) return [];
        if (Array.isArray(health.services)) return health.services;
        // Handle object response if services is a map
        return Object.entries(health.services).map(([key, value]: [string, any]) => ({
            service: key,
            ...value
        }));
    }, [health]);

    if (isLoading) {
        return <MainLoader />;
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Panel de <span className="text-emerald-400">Administración</span>
                </h1>
                <p className="text-slate-400">
                    Bienvenido, {user?.username}. Aquí tienes un resumen del sistema.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" padding="lg">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg ${stat.shadow}`}>
                                    <stat.icon className="text-white" size={22} />
                                </div>
                                <TrendingUp className="text-emerald-400" size={20} />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-slate-400 text-sm">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8"
            >
                <Card variant="glass" padding="lg">
                    <CardTitle className="mb-4">Ingresos de los últimos 30 días</CardTitle>
                    <RevenueChart data={revenueData} isLoading={isRevenueLoading} />
                </Card>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Field Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <FieldStatsList fields={fieldStats} />
                </motion.div>

                {/* System Health */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle className="mb-0">Estado del Sistema</CardTitle>
                            {health && (
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${health.overall_status === 'healthy'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : health.overall_status === 'degraded'
                                        ? 'bg-amber-500/20 text-amber-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {health.overall_status === 'healthy' ? 'Operativo' :
                                        health.overall_status === 'degraded' ? 'Degradado' : 'Crítico'}
                                </span>
                            )}
                        </div>

                        {servicesList.length > 0 ? (
                            <div className="space-y-3">
                                {servicesList.map((service) => (
                                    <div
                                        key={service.service}
                                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Activity className="text-slate-400" size={18} />
                                            <span className="font-medium text-white capitalize">
                                                {service.service.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-slate-400">
                                                {service.latency_ms
                                                    ? `${service.latency_ms}ms`
                                                    : service.response_time
                                                        ? `${(service.response_time * 1000).toFixed(0)}ms`
                                                        : '-'}
                                            </span>
                                            {getHealthIcon(service.status)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-400">
                                Verificando estado de servicios...
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>

            {/* Quick Stats Row */}
            {stats && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    <Card variant="glass" padding="md" className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{stats.general_stats.active_reservations}</div>
                        <div className="text-sm text-slate-400">Reservas Activas</div>
                    </Card>
                    <Card variant="glass" padding="md" className="text-center">
                        <div className="text-2xl font-bold text-red-400">{stats.general_stats.cancelled_reservations}</div>
                        <div className="text-sm text-slate-400">Canceladas</div>
                    </Card>
                    <Card variant="glass" padding="md" className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{stats.general_stats.total_fields}</div>
                        <div className="text-sm text-slate-400">Canchas</div>
                    </Card>
                    <Card variant="glass" padding="md" className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{stats.general_stats.total_users}</div>
                        <div className="text-sm text-slate-400">Usuarios</div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
};
