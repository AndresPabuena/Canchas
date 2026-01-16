'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Plus, Loader2, CalendarX } from 'lucide-react';
import { useReservations } from '@/modules/reservations/hooks/useReservations';
import { ReservationCard } from '@/modules/reservations/components/ReservationCard';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

type TabType = 'active' | 'cancelled';

export const MyReservationsView: React.FC = () => {
    const { isAuthenticated } = useAuthStore();
    const {
        activeReservations,
        cancelledReservations,
        isLoading,
        cancelReservation
    } = useReservations();

    const [activeTab, setActiveTab] = useState<TabType>('active');

    const displayedReservations = activeTab === 'active'
        ? activeReservations
        : cancelledReservations;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <Calendar size={64} className="mx-auto text-slate-600 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Inicia sesión</h2>
                    <p className="text-slate-400 mb-6">Necesitas iniciar sesión para ver tus reservas</p>
                    <Link href="/login">
                        <Button>Ir a Login</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Mis <span className="text-emerald-400">Reservas</span>
                    </h1>
                    <p className="text-slate-400">
                        Gestiona todas tus reservas de canchas
                    </p>
                </div>
                <Link href="/fields">
                    <Button leftIcon={<Plus size={18} />}>
                        Nueva Reserva
                    </Button>
                </Link>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-2 mb-8"
            >
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'active'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                >
                    Activas ({activeReservations.length})
                </button>
                <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'cancelled'
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                >
                    Canceladas ({cancelledReservations.length})
                </button>
            </motion.div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center py-16">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                </div>
            )}

            {/* Reservations Grid */}
            {!isLoading && (
                <AnimatePresence mode="wait">
                    {displayedReservations.length > 0 ? (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {displayedReservations.map((reservation, index) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    index={index}
                                    onCancel={activeTab === 'active' ? cancelReservation : undefined}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-16"
                        >
                            <div className="mb-4 flex justify-center">
                                {activeTab === 'active' ? (
                                    <Calendar className="text-emerald-500" size={64} />
                                ) : (
                                    <CalendarX className="text-red-500" size={64} />
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {activeTab === 'active'
                                    ? 'No tienes reservas activas'
                                    : 'No tienes reservas canceladas'}
                            </h3>
                            <p className="text-slate-400 mb-6">
                                {activeTab === 'active'
                                    ? 'Explora nuestras canchas y haz tu primera reserva'
                                    : 'Las reservas que canceles aparecerán aquí'}
                            </p>
                            {activeTab === 'active' && (
                                <Link href="/fields">
                                    <Button>Ver Canchas Disponibles</Button>
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};
