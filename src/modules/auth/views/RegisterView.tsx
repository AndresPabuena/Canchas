'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { MainLoader } from '@/components/ui/MainLoader';
import { customToast } from '@/components/UX-UI/CustomToastContainer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { authService } from '@/modules/auth/services/authService';

// Validation schema
const registerSchema = z.object({
    username: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Ingresa un email válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterView: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            const response = await authService.register({
                username: data.username,
                email: data.email,
                password: data.password,
            });

            if (!response.success) {
                throw new Error(response.message || 'Error al registrar usuario');
            }

            customToast.success('¡Registro exitoso! Tu cuenta ha sido creada. Ahora puedes iniciar sesión.');

            router.push('/login');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo completar el registro';
            customToast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            {isLoading && <MainLoader />}
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <Card variant="glass" padding="lg" className="border-slate-700/50">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                            className="w-20 h-20 bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                        >
                            <span className="text-3xl font-bold text-white">⚽</span>
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
                        <p className="text-slate-400">Únete a AgendaGol y reserva tu cancha</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Nombre de usuario"
                            type="text"
                            placeholder="juanperez"
                            leftIcon={<User size={18} />}
                            error={errors.username?.message}
                            {...register('username')}
                        />

                        <Input
                            label="Correo electrónico"
                            type="email"
                            placeholder="tu@email.com"
                            leftIcon={<Mail size={18} />}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            leftIcon={<Lock size={18} />}
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Input
                            label="Confirmar contraseña"
                            type="password"
                            placeholder="••••••••"
                            leftIcon={<Lock size={18} />}
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />

                        {/* Terms */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 mt-0.5 mr-2 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-slate-400">
                                Acepto los{' '}
                                <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">
                                    términos y condiciones
                                </Link>{' '}
                                y la{' '}
                                <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">
                                    política de privacidad
                                </Link>
                            </label>
                        </div>

                        <Button type="submit" fullWidth isLoading={isLoading} className="mt-6">
                            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-slate-400 mt-6">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                            Inicia sesión
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};
