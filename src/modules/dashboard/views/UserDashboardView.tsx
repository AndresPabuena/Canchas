'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format, parseISO, isFuture } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    Calendar,
    MapPin,
    Clock,
    Plus,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { reservationService } from '@/modules/reservations/services/reservationService';
import { Reservation } from '@/modules/reservations/types';

export const UserDashboardView: React.FC = () => {
    const { user, token } = useAuthStore();
    const [upcomingReservations, setUpcomingReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current || !token) return;
        isMounted.current = true;

        const loadData = async () => {
            setIsLoading(true);
            const response = await reservationService.getMyReservations({ token });
            if (response.success && response.data.reservations) {
                // Filter only future confirmed reservations
                const upcoming = response.data.reservations
                    .filter(r => r.status === 'confirmada' && isFuture(parseISO(r.start_time)))
                    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
                    .slice(0, 3);
                setUpcomingReservations(upcoming);
            }
            setIsLoading(false);
        };

        loadData();
    }, [token]);

    const stats = [
        {
            label: 'Próximas reservas',
            value: upcomingReservations.length,
            icon: Calendar,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    ¡Hola, <span className="text-emerald-400">{user?.username || 'Jugador'}</span>! 👋
                </h1>
                <p className="text-slate-400 text-lg">
                    Bienvenido a tu panel de AgendaGol
                </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            >
                {/* ... existing content ... */}
                <Link href="/fields" className="group">
                    <Card variant="hover" padding="lg" className="h-full">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                <span className="text-2xl">⚽</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                    Reservar Cancha
                                </h3>
                                <p className="text-slate-400 text-sm">Explora canchas disponibles</p>
                            </div>
                            <ArrowRight className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                        </div>
                    </Card>
                </Link>

                <Link href="/reservations" className="group">
                    <Card variant="hover" padding="lg" className="h-full">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Calendar className="text-white" size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    Mis Reservas
                                </h3>
                                <p className="text-slate-400 text-sm">Gestiona tus reservas</p>
                            </div>
                            <ArrowRight className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </Card>
                </Link>

                <Link href="/fields" className="group">
                    <Card variant="hover" padding="lg" className="h-full border-dashed border-2 border-slate-700 bg-transparent hover:border-emerald-500/50">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center group-hover:border-emerald-500">
                                <Plus className="text-slate-600 group-hover:text-emerald-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-400 group-hover:text-white transition-colors">
                                    Nueva Reserva
                                </h3>
                                <p className="text-slate-500 text-sm">Haz tu próxima reserva</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </motion.div>

            {/* Upcoming Reservations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Próximas Reservas</h2>
                    <Link href="/reservations" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                        Ver todas <ArrowRight size={16} />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                ) : upcomingReservations.length > 0 ? (
                    <div className="grid gap-4">
                        {upcomingReservations.map((reservation, index) => (
                            <motion.div
                                key={reservation.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card variant="glass" padding="md">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="shrink-0 w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                            <span className="text-2xl">⚽</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white">
                                                {reservation.field_name}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} className="text-emerald-500" />
                                                    {reservation.field_location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} className="text-emerald-500" />
                                                    {format(parseISO(reservation.start_time), "d 'de' MMMM", { locale: es })}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} className="text-emerald-500" />
                                                    {format(parseISO(reservation.start_time), 'HH:mm')} - {format(parseISO(reservation.end_time), 'HH:mm')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-emerald-400">
                                                ${reservation.total_price}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {reservation.duration_hours} hora{reservation.duration_hours > 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <Card variant="glass" padding="lg" className="text-center">
                        <div className="py-8">
                            <div className="mb-4 flex justify-center">
                                <Calendar className="text-emerald-500" size={64} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                No tienes reservas próximas
                            </h3>
                            <p className="text-slate-400 mb-6">
                                ¡Es hora de reservar tu próximo partido!
                            </p>
                            <Link href="/fields">
                                <Button leftIcon={<Plus size={18} />}>
                                    Reservar Cancha
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    );
};
