import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, DollarSign, Calendar, Activity } from 'lucide-react';
import { FieldStats } from '@/modules/dashboard/types';

interface FieldDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    field: FieldStats | null;
}

export const FieldDetailsModal: React.FC<FieldDetailsModalProps> = ({ isOpen, onClose, field }) => {
    if (!field) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="relative h-32 bg-linear-to-r from-emerald-600 to-teal-600 p-6 flex items-end">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{field.field_name}</h2>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <MapPin size={14} />
                                        {field.field_location}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Key Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                        <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm">
                                            <DollarSign size={16} className="text-emerald-400" />
                                            Ingresos Totales
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            ${field.total_revenue?.toLocaleString() || 0}
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                        <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm">
                                            <Users size={16} className="text-blue-400" />
                                            Capacidad
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {field.capacity} Personas
                                        </div>
                                    </div>
                                </div>

                                {/* Reservation Details */}
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                                        Estado de Reservas
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                    <Calendar size={16} />
                                                </div>
                                                <span className="text-slate-300">Confirmadas</span>
                                            </div>
                                            <span className="font-bold text-white">{field.confirmed_reservations}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                                                    <X size={16} />
                                                </div>
                                                <span className="text-slate-300">Canceladas</span>
                                            </div>
                                            <span className="font-bold text-white">{field.cancelled_reservations}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                    <Activity size={16} />
                                                </div>
                                                <span className="text-slate-300">Total</span>
                                            </div>
                                            <span className="font-bold text-white">{field.total_reservations}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Footer */}
                                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                    <div className="text-slate-400 text-sm">Precio Promedio: <span className="text-white font-medium">${field.average_price}</span> /hr</div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${field.is_active
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                        {field.is_active ? 'Activa' : 'Inactiva'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
