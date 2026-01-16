'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, isPast } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    MapPin,
    Clock,
    DollarSign,
    Calendar,
    XCircle,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { Reservation } from '@/modules/reservations/types';
import { Button } from '@/components/ui/Button';

interface ReservationCardProps {
    reservation: Reservation;
    onCancel?: (id: number) => void;
    index?: number;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
    reservation,
    onCancel,
    index = 0
}) => {
    const startDate = parseISO(reservation.start_time);
    const endDate = parseISO(reservation.end_time);
    const isActive = reservation.status === 'confirmada';
    const isPastReservation = isPast(endDate);

    const getStatusConfig = () => {
        if (reservation.status === 'cancelada') {
            return {
                icon: XCircle,
                color: 'text-red-400',
                bg: 'bg-red-500/10',
                border: 'border-red-500/30',
                label: 'Cancelada'
            };
        }
        if (isPastReservation) {
            return {
                icon: CheckCircle,
                color: 'text-slate-400',
                bg: 'bg-slate-500/10',
                border: 'border-slate-500/30',
                label: 'Completada'
            };
        }
        return {
            icon: AlertCircle,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/30',
            label: 'Confirmada'
        };
    };

    const status = getStatusConfig();
    const StatusIcon = status.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`bg-slate-800/50 backdrop-blur-sm border ${status.border} rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300`}
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                            {reservation.field_name}
                        </h3>
                        <div className="flex items-center text-slate-400 text-sm">
                            <MapPin size={14} className="mr-1" />
                            {reservation.field_location}
                        </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.bg}`}>
                        <StatusIcon size={14} className={status.color} />
                        <span className={`text-sm font-medium ${status.color}`}>
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-slate-300 text-sm">
                        <Calendar size={16} className="mr-2 text-emerald-500" />
                        {format(startDate, "d 'de' MMMM", { locale: es })}
                    </div>
                    <div className="flex items-center text-slate-300 text-sm">
                        <Clock size={16} className="mr-2 text-emerald-500" />
                        {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                    </div>
                    <div className="flex items-center text-slate-300 text-sm">
                        <DollarSign size={16} className="mr-2 text-emerald-500" />
                        ${reservation.total_price}
                    </div>
                    <div className="text-slate-400 text-sm">
                        {reservation.duration_hours} hora{reservation.duration_hours > 1 ? 's' : ''}
                    </div>
                </div>

                {/* Notes */}
                {reservation.notes && (
                    <p className="text-slate-500 text-sm mb-4 italic">
                        &ldquo;{reservation.notes}&rdquo;
                    </p>
                )}

                {/* Actions */}
                {isActive && !isPastReservation && onCancel && (
                    <Button
                        variant="danger"
                        size="sm"
                        fullWidth
                        onClick={() => onCancel(reservation.id)}
                    >
                        Cancelar Reserva
                    </Button>
                )}
            </div>
        </motion.div>
    );
};
