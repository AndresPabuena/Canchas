'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, DollarSign, Heart } from 'lucide-react';
import { Field } from '@/modules/fields/types';
import { Button } from '@/components/ui/Button';
import { useFavoritesStore } from '@/store/favoritesStore';

interface FieldCardProps {
    field: Field;
    index?: number;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, index = 0 }) => {
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavoritesStore();

    const handleViewDetails = () => {
        router.push(`/fields/${field.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
        >
            {/* Image placeholder with gradient */}
            <div className="relative h-48 bg-linear-to-br from-emerald-600/20 to-green-800/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">⚽</span>
                </div>
                {/* Price badge */}
                <div className="absolute top-4 right-14 bg-emerald-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    <DollarSign size={14} className="text-white" />
                    <span className="text-white font-bold text-sm">${field.price_per_hour}/hr</span>
                </div>
                {/* Status badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${field.is_active ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    {field.is_active ? 'Disponible' : 'No disponible'}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {field.name}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-400 text-sm">
                        <MapPin size={16} className="mr-2 text-emerald-500" />
                        {field.location}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                        <Users size={16} className="mr-2 text-emerald-500" />
                        Capacidad: {field.capacity} jugadores
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                        <Clock size={16} className="mr-2 text-emerald-500" />
                        {field.opening_time} - {field.closing_time}
                    </div>
                </div>

                {field.description && (
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                        {field.description}
                    </p>
                )}

                <Button
                    onClick={handleViewDetails}
                    fullWidth
                    variant="outline"
                    size="sm"
                >
                    Ver Disponibilidad
                </Button>
            </div>

            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(field.id);
                }}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${isFavorite(field.id)
                    ? 'bg-red-500/20 text-red-500 scale-110'
                    : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
            >
                <Heart size={20} className={isFavorite(field.id) ? 'fill-current' : ''} />
            </button>
        </motion.div>
    );
};
