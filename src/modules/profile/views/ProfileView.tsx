'use client';

import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/store/authStore';
import { http } from '@/lib/http';
import { customToast } from '@/components/UX-UI/CustomToastContainer';
import { User, Mail, Shield, Calendar, Edit, Loader2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { CreditCard } from '@/components/ui/CreditCard';

const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL || 'http://localhost:8000';

export const ProfileView: React.FC = () => {
    const { user, token, setUser } = useAuthStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return null;

    const openEditModal = () => {
        setNewUsername(user.username);
        setIsEditModalOpen(true);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newUsername.trim()) {
            customToast.error('El nombre de usuario no puede estar vacío');
            return;
        }

        setIsLoading(true);
        try {
            const response = await http.patch<any>(
                `${AUTH_URL}/auth/profile`,
                { username: newUsername },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.success) {
                // Update local store
                setUser({ ...user, username: newUsername });
                customToast.success('Perfil actualizado correctamente');
                setIsEditModalOpen(false);
            } else {
                customToast.error(response.message || 'Error actualizando perfil');
            }
        } catch (error) {
            customToast.error('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
                    <Button onClick={openEditModal}>
                        <Edit size={16} className="mr-2" />
                        Editar Perfil
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card variant="glass" padding="lg" className="md:col-span-1">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-xl mb-6">
                                <span className="text-4xl font-bold text-emerald-400">
                                    {user.username[0].toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-1">{user.username}</h2>
                            <p className="text-slate-400 text-sm mb-4">{user.email}</p>

                            <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
                                {user.is_admin ? 'Administrador' : 'Usuario'}
                            </div>
                        </div>
                    </Card>

                    {/* Details Card */}
                    <Card variant="glass" padding="lg" className="md:col-span-2">
                        <CardTitle className="mb-6">Información Personal</CardTitle>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2">
                                        <User size={16} />
                                        Nombre de Usuario
                                    </label>
                                    <div className="p-3 bg-slate-800/50 rounded-lg text-white border border-slate-700/50">
                                        {user.username}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2">
                                        <Mail size={16} />
                                        Correo Electrónico
                                    </label>
                                    <div className="p-3 bg-slate-800/50 rounded-lg text-white border border-slate-700/50">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2">
                                        <Shield size={16} />
                                        Rol
                                    </label>
                                    <div className="p-3 bg-slate-800/50 rounded-lg text-white border border-slate-700/50 capitalize">
                                        {user.is_admin ? 'Administrador del Sistema' : 'Usuario Registrado'}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2">
                                        <Calendar size={16} />
                                        Miembro Desde
                                    </label>
                                    <div className="p-3 bg-slate-800/50 rounded-lg text-white border border-slate-700/50">
                                        {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Wallet Section 
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Billetera Virtual</h2>
                        <Button variant="outline" size="sm" onClick={() => customToast.info('Funcionalidad de demo')}>
                            <Plus size={16} className="mr-2" />
                            Agregar Método de Pago
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CreditCard
                            holderName={user.username.toUpperCase()}
                            cardNumber="**** **** **** 4242"
                            expiryDate="12/28"
                            variant="primary"
                        />
                        <CreditCard
                            holderName={user.username.toUpperCase()}
                            cardNumber="**** **** **** 8888"
                            expiryDate="09/27"
                            variant="secondary"
                        />

                  
                        <div className="aspect-[1.586/1] border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-emerald-400 hover:bg-slate-800/30 transition-all cursor-pointer group" onClick={() => customToast.info('Funcionalidad de demo')}>
                            <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center mb-3 transition-colors">
                                <Plus size={24} />
                            </div>
                            <span className="font-medium">Agregar Nueva Tarjeta</span>
                        </div>
                    </div>
                </div>*/}
            </motion.div>

            {/* Edit Profile Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Editar Perfil" size="md">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <Input
                        label="Nombre de Usuario"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Tu nombre de usuario"
                        required
                    />
                    <p className="text-sm text-slate-400">
                        Tiene Problema de CORS
                    </p>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={16} />
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Cambios'
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
