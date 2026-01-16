'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { customToast } from '@/components/UX-UI/CustomToastContainer';

const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL || 'http://localhost:8000';

export const ForgotPasswordView: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            customToast.error('Por favor ingresa tu correo electrónico');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${AUTH_URL}/auth/password-recovery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setIsSuccess(true);
                customToast.success('Correo de recuperación enviado');
            } else {
                const data = await response.json();
                customToast.error(data.detail || 'Error al enviar correo de recuperación');
            }
        } catch (error) {
            customToast.error('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Back to Login */}
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Volver al inicio de sesión
                </Link>

                <Card variant="glass" padding="lg">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                            <Mail className="text-emerald-400" size={28} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Recuperar Contraseña
                        </h1>
                        <p className="text-slate-400">
                            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                        </p>
                    </div>

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                <CheckCircle className="text-emerald-400" size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">
                                ¡Correo enviado!
                            </h2>
                            <p className="text-slate-400 mb-6">
                                Revisa tu bandeja de entrada en <span className="text-emerald-400">{email}</span>
                            </p>
                            <Link href="/login">
                                <Button className="w-full">
                                    Volver al inicio de sesión
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Correo Electrónico"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" size={18} />
                                        Enviando...
                                    </>
                                ) : (
                                    'Enviar instrucciones'
                                )}
                            </Button>
                        </form>
                    )}
                </Card>
            </motion.div>
        </div>
    );
};
