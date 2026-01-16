'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, Column } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { rolesService } from '@/modules/roles/services/rolesService';
import { Role, RoleCreate } from '@/modules/roles/types';
import { customToast } from '@/components/UX-UI/CustomToastContainer';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export const RolesView: React.FC = () => {
    const router = useRouter();
    const { token, user } = useAuthStore();
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [formData, setFormData] = useState<RoleCreate>({ name: '', description: '', is_active: true });
    const isMounted = useRef(false);

    const ROLES_COLUMNS: Column<Role>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Nombre', accessorKey: 'name' },
        { header: 'Descripción', accessorKey: 'description' },
        {
            header: 'Estado',
            render: (role) => (
                <span className={`px-2 py-1 rounded-full text-xs ${role.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {role.is_active ? 'Activo' : 'Inactivo'}
                </span>
            )
        },
        {
            header: 'Acciones',
            render: (role) => (
                <div className="flex gap-2">
                    {/* <Button variant="ghost" size="sm" onClick={() => openEditModal(role)}>
                        <Edit size={16} />
                    </Button> */}
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(role)}>
                        <Trash2 size={16} className="text-red-400" />
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        if (!isMounted.current && token) {
            if (user && !user.is_admin) {
                router.push('/dashboard');
                return;
            }
            isMounted.current = true;
            loadRoles();
        }
    }, [token, user, router]);

    const loadRoles = async () => {
        setIsLoading(true);
        try {
            const response = await rolesService.getAll(token!);
            if (response.success && response.data) {
                setRoles(response.data);
            } else {
                customToast.error(response.message || 'Error cargando roles');
            }
        } catch (error) {
            customToast.error('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingRole) {
                const response = await rolesService.update(editingRole.id, formData, token!);
                if (response.success) {
                    customToast.success('Rol actualizado correctamente');
                    loadRoles();
                    closeModal();
                } else {
                    customToast.error(response.message || 'Error actualizando rol');
                }
            } else {
                const response = await rolesService.create(formData, token!);
                if (response.success) {
                    customToast.success('Rol creado correctamente');
                    loadRoles();
                    closeModal();
                } else {
                    customToast.error(response.message || 'Error creando rol');
                }
            }
        } catch (error) {
            customToast.error('Error de conexión');
        }
    };

    const handleDelete = async (role: Role) => {
        const result = await Swal.fire({
            title: '¿Eliminar rol?',
            text: `Se eliminará el rol "${role.name}". Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#1e293b',
            color: '#f8fafc'
        });

        if (result.isConfirmed) {
            try {
                const response = await rolesService.delete(role.id, token!);
                if (response.success) {
                    customToast.success('Rol eliminado correctamente');
                    loadRoles();
                } else {
                    customToast.error(response.message || 'Error eliminando rol');
                }
            } catch (error) {
                customToast.error('Error de conexión');
            }
        }
    };

    const openCreateModal = () => {
        setEditingRole(null);
        setFormData({ name: '', description: '', is_active: true });
        setIsModalOpen(true);
    };

    const openEditModal = (role: Role) => {
        setEditingRole(role);
        setFormData({ name: role.name, description: role.description, is_active: role.is_active });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingRole(null);
        setFormData({ name: '', description: '', is_active: true });
    };

    if (!user?.is_admin) return null;

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <Shield className="text-emerald-400" size={28} />
                        <h1 className="text-2xl font-bold text-white">Gestión de Roles</h1>
                    </div>
                    <Button onClick={openCreateModal}>
                        <Plus size={18} className="mr-2" />
                        Nuevo Rol
                    </Button>
                </div>

                <Card variant="glass" padding="lg">
                    <Table
                        columns={ROLES_COLUMNS}
                        data={roles}
                        isLoading={isLoading}
                        emptyMessage="No hay roles registrados"
                    />
                </Card>
            </motion.div>

            {/* Create/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingRole ? 'Editar Rol' : 'Nuevo Rol'} size="md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Descripción"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-4 h-4 accent-emerald-500"
                        />
                        <label htmlFor="is_active" className="text-slate-300 text-sm">Activo</label>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
                        <Button type="submit">{editingRole ? 'Guardar' : 'Crear'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
