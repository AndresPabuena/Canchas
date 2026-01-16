'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, DollarSign, Zap, Calendar, ShieldCheck } from 'lucide-react';
import { fieldService } from '@/modules/fields/services/fieldService';
import { Field } from '@/modules/fields/types';
import { Card } from '@/components/ui/Card';
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel';

import { SoccerBackgroundAnimation } from '../components/SoccerBackgroundAnimation';

export const LandingView = () => {
    const [fields, setFields] = useState<Field[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFields = async () => {
            try {
                const response = await fieldService.getAll({ is_active: true, limit: 6 });
                if (response.success && response.data) {
                    setFields(response.data.fields);
                }
            } catch (error) {
                console.error('Error loading public fields:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFields();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
            {/* Background effects */}

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-24 md:py-32 relative overflow-hidden">

                    <SoccerBackgroundAnimation />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 text-sm font-medium">Reservas disponibles 24/7</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            Reserva tu <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-green-500">cancha</span> en segundos
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
                        >
                            La plataforma más fácil y rápida para encontrar y reservar canchas de fútbol.
                            Disponibilidad en tiempo real, pagos seguros y confirmación instantánea.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/fields"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                            >
                                Ver Canchas Disponibles
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/register"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-all duration-300"
                            >
                                Crear Cuenta Gratis
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Public Fields Section */}
                <section className="container mx-auto px-4 py-20 bg-slate-900/50">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Nuestras <span className="text-emerald-400">Canchas</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Explora las mejores canchas disponibles para tu próximo partido
                        </p>
                    </div>

                    {!isLoading && fields.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {fields.map((field, index) => (
                                <motion.div
                                    key={field.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/fields/${field.id}`}>
                                        <Card variant="glass" padding="none" className="h-full hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden cursor-pointer group">
                                            <div className="relative h-48 bg-slate-800">
                                                {/* Placeholder image since we don't have real images yet */}
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                                                    <span className="text-4xl">⚽</span>
                                                </div>
                                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                                                    {field.opening_time.slice(0, 5)} - {field.closing_time.slice(0, 5)}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                    {field.name}
                                                </h3>
                                                <div className="flex items-center text-slate-400 text-sm mb-4">
                                                    <MapPin size={16} className="mr-1" />
                                                    {field.location}
                                                </div>
                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                                                    <div className="flex items-center text-emerald-400 font-bold">
                                                        <DollarSign size={18} />
                                                        {field.price_per_hour.toLocaleString()}/hora
                                                    </div>
                                                    <div className="flex items-center text-slate-400 text-sm">
                                                        <Users size={16} className="mr-1" />
                                                        {field.capacity} Jugadores
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            {isLoading ? (
                                <div className="flex justify-center">
                                    <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <p className="text-slate-400">No hay canchas disponibles en este momento.</p>
                            )}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link href="/fields">
                            <button className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center justify-center mx-auto gap-2">
                                Ver todas las canchas
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            ¿Por qué <span className="text-emerald-400">AgendaGol</span>?
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Todo lo que necesitas para organizar tu partido perfecto
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: 'Reserva Instantánea',
                                description: 'Confirma tu cancha en menos de 1 minuto. Sin llamadas, sin esperas.',
                            },
                            {
                                icon: Calendar,
                                title: 'Disponibilidad Real',
                                description: 'Ve los horarios disponibles en tiempo real y elige el que mejor te convenga.',
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Pagos Seguros',
                                description: 'Tus pagos están protegidos. Cancela hasta 24h antes sin costo.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-linear-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="text-emerald-400 w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <TestimonialsCarousel />

                {/* Footer */}
                <footer className="border-t border-slate-800">
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                                    <span className="text-xl">⚽</span>
                                </div>
                                <span className="text-xl font-bold text-white">AgendaGol</span>
                            </div>

                            <p className="text-slate-500 text-sm">
                                © 2026 AgendaGol. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
