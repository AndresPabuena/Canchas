'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { format, parseISO, addDays, startOfToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Clock,
    DollarSign,
    FileText,
    Loader2,
    CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { fieldService } from '@/modules/fields/services/fieldService';
import { Field, FieldAvailability } from '@/modules/fields/types';
import { useReservations } from '@/modules/reservations/hooks/useReservations';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';
import { customToast } from '@/components/UX-UI/CustomToastContainer';
import { PaymentModal } from '@/components/ui/PaymentModal';

export const CreateReservationView: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuthStore();
    const { createReservation, isLoading: isCreating } = useReservations();

    // Get URL params
    const fieldIdParam = searchParams.get('field_id');
    const dateParam = searchParams.get('date');
    const hourParam = searchParams.get('hour');

    // State
    const [field, setField] = useState<Field | null>(null);
    const [availability, setAvailability] = useState<FieldAvailability | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(
        dateParam ? parseISO(dateParam) : startOfToday()
    );
    const [selectedHour, setSelectedHour] = useState<string | null>(hourParam || null);
    const [duration, setDuration] = useState<1 | 2>(1);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

    // Generate next 30 days
    const availableDates = useMemo(() => {
        const dates = [];
        const today = startOfToday();
        for (let i = 0; i < 30; i++) {
            dates.push(addDays(today, i));
        }
        return dates;
    }, []);

    // Calculate total price
    const totalPrice = field ? field.price_per_hour * duration : 0;

    // Load field details
    useEffect(() => {
        if (!fieldIdParam) {
            router.push('/fields');
            return;
        }

        const loadField = async () => {
            setIsLoading(true);
            const response = await fieldService.getById(parseInt(fieldIdParam));
            if (response.success) {
                setField(response.data);
            } else {
                customToast.error('No se pudo cargar la información de la cancha');
                router.push('/fields');
            }
            setIsLoading(false);
        };
        loadField();
    }, [fieldIdParam, router]);

    // Load availability when date changes
    useEffect(() => {
        if (!field) return;

        const loadAvailability = async () => {
            setIsLoadingAvailability(true);
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const response = await fieldService.getAvailability(field.id, dateStr);
            if (response.success) {
                setAvailability(response.data);
            } else {
                setAvailability({ field_id: field.id, date: dateStr, available_hours: [] });
            }
            setIsLoadingAvailability(false);
        };
        loadAvailability();
    }, [field, selectedDate]);

    // Payment Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Handle initial submit (Validation)
    const handleInitialSubmit = () => {
        if (!isAuthenticated) {
            Swal.fire({
                icon: 'info',
                title: 'Inicia sesión',
                text: 'Necesitas iniciar sesión para hacer una reserva',
                confirmButtonText: 'Ir a Login',
                showCancelButton: true,
                background: '#1e293b',
                color: '#fff',
            }).then((r) => r.isConfirmed && router.push('/login'));
            return;
        }

        if (!field || !selectedHour) {
            customToast.warning('Por favor selecciona una fecha y hora');
            return;
        }

        setIsPaymentModalOpen(true);
    };

    // Handle actual reservation after payment
    const handlePaymentSuccess = async () => {
        if (!field || !selectedHour) return;

        // Build start_time ISO string
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const startTimeISO = `${dateStr}T${selectedHour}:00`;

        const success = await createReservation({
            field_id: field.id,
            start_time: startTimeISO,
            duration_hours: duration,
            notes: notes || undefined,
        });

        if (success) {
            // Check if we need to redirect or if createReservation handles it
            // Assuming createReservation handles toast but maybe not redirection to list if we want a specific success view
            // But for now, let's keep consistent with previous behavior
            router.push('/reservations');
        }
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
        <div className="space-y-8">
            {/* Back button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                Volver
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-8">
                    Nueva <span className="text-emerald-400">Reserva</span>
                </h1>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Date Selection */}
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="text-emerald-500" size={20} />
                            <h2 className="text-lg font-semibold text-white">Fecha</h2>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {availableDates.map((date) => (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => {
                                        setSelectedDate(date);
                                        setSelectedHour(null);
                                    }}
                                    className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all ${isSameDay(date, selectedDate)
                                        ? 'bg-emerald-500 border-emerald-400 text-white'
                                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                                        }`}
                                >
                                    <span className="text-xs uppercase">{format(date, 'EEE', { locale: es })}</span>
                                    <span className="text-lg font-bold">{format(date, 'd')}</span>
                                    <span className="text-xs">{format(date, 'MMM', { locale: es })}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Time Selection */}
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="text-emerald-500" size={20} />
                            <h2 className="text-lg font-semibold text-white">Hora</h2>
                        </div>
                        {isLoadingAvailability ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                            </div>
                        ) : availability && availability.available_hours.length > 0 ? (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {availability.available_hours.map((hour) => (
                                    <button
                                        key={hour}
                                        onClick={() => setSelectedHour(hour)}
                                        className={`py-3 rounded-xl border font-medium transition-all ${selectedHour === hour
                                            ? 'bg-emerald-500 border-emerald-400 text-white'
                                            : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        {hour}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-slate-400 py-8">No hay horarios disponibles</p>
                        )}
                    </Card>

                    {/* Duration */}
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="text-emerald-500" size={20} />
                            <h2 className="text-lg font-semibold text-white">Duración</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setDuration(1)}
                                className={`p-4 rounded-xl border text-center transition-all ${duration === 1
                                    ? 'bg-emerald-500 border-emerald-400 text-white'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                                    }`}
                            >
                                <div className="text-2xl font-bold">1</div>
                                <div className="text-sm">hora</div>
                            </button>
                            <button
                                onClick={() => setDuration(2)}
                                className={`p-4 rounded-xl border text-center transition-all ${duration === 2
                                    ? 'bg-emerald-500 border-emerald-400 text-white'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                                    }`}
                            >
                                <div className="text-2xl font-bold">2</div>
                                <div className="text-sm">horas</div>
                            </button>
                        </div>
                    </Card>

                    {/* Notes */}
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-emerald-500" size={20} />
                            <h2 className="text-lg font-semibold text-white">Notas (opcional)</h2>
                        </div>
                        <Input
                            placeholder="Agrega notas o comentarios para tu reserva..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Card>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <Card variant="glass" padding="lg" className="sticky top-8">
                        <h2 className="text-lg font-semibold text-white mb-4">Resumen</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xl">⚽</span>
                                </div>
                                <div>
                                    <div className="font-medium text-white">{field.name}</div>
                                    <div className="text-sm text-slate-400 flex items-center gap-1">
                                        <MapPin size={12} /> {field.location}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-700 pt-4 space-y-2">
                                <div className="flex justify-between text-slate-300">
                                    <span>Fecha</span>
                                    <span className="font-medium text-white">
                                        {format(selectedDate, "d 'de' MMMM", { locale: es })}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Hora</span>
                                    <span className="font-medium text-white">
                                        {selectedHour || '--:--'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Duración</span>
                                    <span className="font-medium text-white">{duration} hora{duration > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Precio/hora</span>
                                    <span className="font-medium text-white">${field.price_per_hour}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-700 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-white">Total</span>
                                    <span className="text-2xl font-bold text-emerald-400">${totalPrice}</span>
                                </div>
                            </div>
                        </div>

                        {selectedHour && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center gap-2"
                            >
                                <CheckCircle size={16} className="text-emerald-400" />
                                <span className="text-sm text-emerald-400">Listo para confirmar</span>
                            </motion.div>
                        )}

                        <Button
                            onClick={handleInitialSubmit}
                            fullWidth
                            size="lg"
                            isLoading={isCreating}
                            disabled={!selectedHour}
                        >
                            {isCreating ? 'Procesando...' : 'Ir a Pagar'}
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Payment Modal */}
            {field && (
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    fieldName={field.name}
                    date={format(selectedDate, "d 'de' MMMM", { locale: es })}
                    time={selectedHour || ''}
                    price={totalPrice}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};
