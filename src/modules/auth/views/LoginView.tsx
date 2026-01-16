'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { MainLoader } from '@/components/ui/MainLoader';
import { customToast } from '@/components/UX-UI/CustomToastContainer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { authService } from '@/modules/auth/services/authService';
import { useAuthStore } from '@/store/authStore';

// Validation schema
const loginSchema = z.object({
    email: z.string().email('Ingresa un email válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginView: React.FC = () => {
    const router = useRouter();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            // 1. Login and get token
            const tokenResponse = await authService.login(data);

            if (!tokenResponse.success) {
                throw new Error(tokenResponse.message || 'Error al iniciar sesión');
            }

            const { access_token } = tokenResponse.data;

            // 2. Get user data
            const userResponse = await authService.getMe({ token: access_token });

            if (!userResponse.success) {
                throw new Error('Error al obtener información del usuario');
            }

            // 3. Store in auth state
            login(userResponse.data, access_token);

            // 4. Show success and redirect
            customToast.success(`¡Bienvenido! Hola ${userResponse.data.username}`);

            router.push('/dashboard');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Credenciales incorrectas';
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
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

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
                        <h1 className="text-3xl font-bold text-white mb-2">AgendaGol</h1>
                        <p className="text-slate-400">Inicia sesión en tu cuenta</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-slate-400">
                                <input type="checkbox" className="w-4 h-4 mr-2 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
                                Recordarme
                            </label>
                            <Link href="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button type="submit" fullWidth isLoading={isLoading} leftIcon={isLoading ? undefined : <Loader2 className={isLoading ? 'animate-spin' : 'hidden'} size={18} />}>
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    {/* Divider 
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-transparent text-slate-500">o continúa con</span>
                        </div>
                    </div>

                   
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="secondary" className="text-sm">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="secondary" className="text-sm">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </Button>
                    </div>
*/}
                    {/* Register Link */}
                    <p className="text-center text-slate-400 mt-6">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                            Regístrate gratis
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};
