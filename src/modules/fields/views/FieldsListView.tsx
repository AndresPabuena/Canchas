'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Heart } from 'lucide-react';
import { MainLoader } from '@/components/ui/MainLoader';
import { useFields } from '@/modules/fields/hooks/useFields';
import { FieldCard } from '@/modules/fields/components/FieldCard';
import { Input } from '@/components/ui/Input';
import { useFavoritesStore } from '@/store/favoritesStore';

export const FieldsListView: React.FC = () => {
    const { fields, isLoading, error } = useFields();
    const { isFavorite } = useFavoritesStore();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [locationFilter, setLocationFilter] = React.useState('');
    const [showFavorites, setShowFavorites] = React.useState(false);

    // Get unique locations for filter
    const locations = React.useMemo(() => {
        const uniqueLocations = [...new Set(fields.map(f => f.location))];
        return uniqueLocations.sort();
    }, [fields]);

    // Filtered fields
    const filteredFields = React.useMemo(() => {
        return fields.filter(field => {
            const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                field.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = !locationFilter || field.location === locationFilter;
            const matchesFavorites = !showFavorites || isFavorite(field.id);
            return matchesSearch && matchesLocation && matchesFavorites;
        });
    }, [fields, searchTerm, locationFilter, showFavorites, isFavorite]);

    if (isLoading) {
        return <MainLoader />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Nuestras <span className="text-emerald-400">Canchas</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Encuentra la cancha perfecta para tu próximo partido. Todas nuestras instalaciones están equipadas con las mejores condiciones.
                </p>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                        placeholder="Buscar canchas..."
                        leftIcon={<Search size={18} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Todas las ubicaciones</option>
                            {locations.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${showFavorites
                            ? 'bg-red-500/10 border-red-500 text-red-400'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                    >
                        <Heart size={18} className={showFavorites ? 'fill-current' : ''} />
                        <span>Solo Favoritos</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-slate-400 bg-slate-800/30 rounded-xl border border-slate-700/50">
                        <Filter size={18} className="text-emerald-500" />
                        <span>{filteredFields.length} canchas</span>
                    </div>
                </div>
            </motion.div>

            {/* Error state */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-8 text-center">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Fields Grid */}
            {filteredFields.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFields.map((field, index) => (
                        <FieldCard key={field.id} field={field} index={index} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="text-6xl mb-4">🏟️</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No se encontraron canchas</h3>
                    <p className="text-slate-400">Intenta con otros filtros de búsqueda</p>
                </motion.div>
            )}
        </div>
    );
};
