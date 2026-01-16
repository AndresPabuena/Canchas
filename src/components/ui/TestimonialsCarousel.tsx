import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from './Card';

const TESTIMONIALS = [
    {
        id: 1,
        name: "Carlos Rodríguez",
        role: "Capitán - Los Galácticos",
        content: "La mejor plataforma para reservar. Ya no perdemos tiempo llamando a todas las canchas, aquí vemos disponibilidad al instante.",
        rating: 5,
        avatar: "CR"
    },
    {
        id: 2,
        name: "Ana María Pérez",
        role: "Organizadora de Torneos",
        content: "Super intuitiva y rápida. Me encanta poder pagar directamente y asegurar el cupo sin líos. ¡Recomendadísima!",
        rating: 5,
        avatar: "AP"
    },
    {
        id: 3,
        name: "Juan David Lopez",
        role: "Jugador Amateur",
        content: "Las canchas son top y la app funciona perfecto. Me gusta ver las fotos reales antes de ir.",
        rating: 4,
        avatar: "JL"
    },
    {
        id: 4,
        name: "Sofía Vergara",
        role: "Entrenadora",
        content: "Excelente servicio al cliente y la interfaz es muy limpia. Mis chicas reservan aquí siempre para entrenar.",
        rating: 5,
        avatar: "SV"
    },
    {
        id: 5,
        name: "Miguel Ángel",
        role: "Portero - F.C. Barrio",
        content: "Desde que usamos esta app, nunca nos hemos quedado sin cancha. El sistema de favoritos es genial.",
        rating: 5,
        avatar: "MA"
    }
];

export const TestimonialsCarousel: React.FC = () => {
    return (
        <div className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Comunidad</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                    Lo que dicen nuestros <span className="text-emerald-500">Cracks</span>
                </h2>
            </div>

            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track */}
            <div className="flex overflow-hidden">
                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 30,
                        repeat: Infinity,
                    }}
                    style={{ width: "200%" }} // Double width for seamless loop
                >
                    {/* Render items twice to create seamless loop */}
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="w-[300px] md:w-[400px] shrink-0"
                        >
                            <Card variant="glass" padding="lg" className="h-full relative group hover:bg-slate-800/80 transition-colors border-slate-700/50">
                                <Quote className="absolute top-4 right-4 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" size={40} />

                                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < item.rating ? "currentColor" : "none"}
                                            className={i < item.rating ? "" : "text-slate-600"}
                                        />
                                    ))}
                                </div>

                                <p className="text-slate-300 mb-6 italic relative z-10">
                                    "{item.content}"
                                </p>

                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                                        {item.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                        <p className="text-xs text-slate-400">{item.role}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
