'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { format, addDays, isSameDay, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    ArrowLeft,
    MapPin,
    Users,
    Clock,
    DollarSign,
    Calendar,
    Loader2,
    CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { fieldService } from '@/modules/fields/services/fieldService';
import { Field, FieldAvailability } from '@/modules/fields/types';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';
import { customToast } from '@/components/UX-UI/CustomToastContainer';

interface FieldDetailViewProps {
    fieldId: number;
}

export const FieldDetailView: React.FC<FieldDetailViewProps> = ({ fieldId }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    const [field, setField] = useState<Field | null>(null);
    const [availability, setAvailability] = useState<FieldAvailability | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

    // Generate next 30 days for date picker
    const availableDates = useMemo(() => {
        const dates = [];
        const today = startOfToday();
        for (let i = 0; i < 30; i++) {
            dates.push(addDays(today, i));
        }
        return dates;
    }, []);

    // Load field details
    useEffect(() => {
        const loadField = async () => {
            setIsLoading(true);
            const response = await fieldService.getById(fieldId);
            if (response.success) {
                setField(response.data);
            } else {
                customToast.error('No se pudo cargar la información de la cancha');
                router.push('/fields');
            }
            setIsLoading(false);
        };
        loadField();
    }, [fieldId, router]);

    // Load availability when date changes
    useEffect(() => {
        const loadAvailability = async () => {
            if (!field) return;
            setIsLoadingAvailability(true);
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const response = await fieldService.getAvailability(fieldId, dateStr);
            if (response.success) {
                setAvailability(response.data);
            } else {
                setAvailability({ field_id: fieldId, date: dateStr, available_hours: [] });
            }
            setIsLoadingAvailability(false);
            setSelectedHour(null);
        };
        loadAvailability();
    }, [field, selectedDate, fieldId]);

    const handleReserve = () => {
        if (!isAuthenticated) {
            Swal.fire({
                icon: 'info',
                title: 'Inicia sesión',
                text: 'Necesitas iniciar sesión para hacer una reserva',
                confirmButtonText: 'Ir a Login',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                background: '#1e293b',
                color: '#fff',
                confirmButtonColor: '#10b981',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/login');
                }
            });
            return;
        }

        if (!selectedHour) {
            customToast.warning('Por favor selecciona un horario disponible');
            return;
        }

        // Navigate to reservation creation with pre-selected data
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        router.push(`/reservations/new?field_id=${fieldId}&date=${dateStr}&hour=${selectedHour}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!field) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Volver a canchas
                </motion.button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Field Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-1"
                    >
                        <Card variant="glass" padding="none" className="overflow-hidden">
                            {/* Image */}
                            <div className="h-48 bg-linear-to-br from-emerald-600/30 to-green-800/40 flex items-center justify-center">
                                <span className="text-8xl">⚽</span>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-white">{field.name}</h1>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${field.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {field.is_active ? 'Activa' : 'Inactiva'}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-slate-300">
                                        <MapPin size={18} className="mr-3 text-emerald-500" />
                                        {field.location}
                                    </div>
                                    <div className="flex items-center text-slate-300">
                                        <Users size={18} className="mr-3 text-emerald-500" />
                                        Capacidad: {field.capacity} jugadores
                                    </div>
                                    <div className="flex items-center text-slate-300">
                                        <Clock size={18} className="mr-3 text-emerald-500" />
                                        {field.opening_time} - {field.closing_time}
                                    </div>
                                    <div className="flex items-center text-lg font-bold text-emerald-400">
                                        <DollarSign size={20} className="mr-3" />
                                        ${field.price_per_hour} / hora
                                    </div>
                                </div>

                                {field.description && (
                                    <p className="text-slate-400 mt-4 pt-4 border-t border-slate-700">
                                        {field.description}
                                    </p>
                                )}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Availability Calendar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <Card variant="glass" padding="lg">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="text-emerald-500" size={24} />
                                <h2 className="text-xl font-bold text-white">Selecciona Fecha y Hora</h2>
                            </div>

                            {/* Date selector */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-slate-400 mb-3">Fecha</h3>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                                    {availableDates.map((date) => (
                                        <button
                                            key={date.toISOString()}
                                            onClick={() => setSelectedDate(date)}
                                            className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all ${isSameDay(date, selectedDate)
                                                ? 'bg-emerald-500 border-emerald-400 text-white'
                                                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                                                }`}
                                        >
                                            <span className="text-xs uppercase">
                                                {format(date, 'EEE', { locale: es })}
                                            </span>
                                            <span className="text-lg font-bold">{format(date, 'd')}</span>
                                            <span className="text-xs">{format(date, 'MMM', { locale: es })}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time slots */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-slate-400 mb-3">
                                    Horarios disponibles - {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                                </h3>

                                {isLoadingAvailability ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                                    </div>
                                ) : availability && availability.available_hours.length > 0 ? (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                        {availability.available_hours.map((hour) => (
                                            <button
                                                key={hour}
                                                onClick={() => setSelectedHour(hour)}
                                                className={`py-3 px-4 rounded-xl border font-medium transition-all ${selectedHour === hour
                                                    ? 'bg-emerald-500 border-emerald-400 text-white'
                                                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-white'
                                                    }`}
                                            >
                                                {hour}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-slate-400">
                                        <Clock size={40} className="mx-auto mb-3 opacity-50" />
                                        <p>No hay horarios disponibles para esta fecha</p>
                                    </div>
                                )}
                            </div>

                            {/* Selected summary and Reserve button */}
                            {selectedHour && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4"
                                >
                                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                        <CheckCircle size={18} />
                                        <span className="font-medium">Selección actual</span>
                                    </div>
                                    <p className="text-white">
                                        {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las {selectedHour}
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Precio: ${field.price_per_hour} por hora
                                    </p>
                                </motion.div>
                            )}

                            <Button
                                onClick={handleReserve}
                                fullWidth
                                size="lg"
                                disabled={!selectedHour}
                            >
                                {!isAuthenticated ? 'Inicia sesión para reservar' : 'Continuar con la reserva'}
                            </Button>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
