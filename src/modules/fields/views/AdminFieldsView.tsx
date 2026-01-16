'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { MainLoader } from '@/components/ui/MainLoader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { useFields } from '@/modules/fields/hooks/useFields';
import { FieldFormModal } from '@/modules/fields/components/FieldFormModal';
import { getFieldColumns } from '@/modules/fields/constants/fieldsConstants';
import { Field, FieldCreate, FieldUpdate } from '@/modules/fields/types';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';

export const AdminFieldsView: React.FC = () => {
    const {
        fields,
        isLoading,
        createField,
        updateField,
        deleteField,
        loadFields
    } = useFields();

    const { token } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<Field | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Reload when status filter changes
    React.useEffect(() => {
        const isActive = statusFilter === 'all' ? undefined : statusFilter === 'active';
        loadFields(isActive);
    }, [statusFilter, loadFields]);

    // Filter fields client-side for search term
    const filteredFields = fields.filter(field =>
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleCreate = () => {
        setSelectedField(null);
        setIsModalOpen(true);
    };

    const handleEdit = (field: Field) => {
        setSelectedField(field);
        setIsModalOpen(true);
    };

    const handleDelete = async (field: Field) => {
        if (!token) return;

        Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar la cancha "${field.name}". Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#1e293b',
            color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteField(field.id, token);
                } catch (error) {
                    // Error is handled in hook
                }
            }
        });
    };

    const handleSubmit = async (data: FieldCreate | FieldUpdate) => {
        if (!token) return;

        try {
            if (selectedField) {
                await updateField(selectedField.id, data, token);
            } else {
                await createField(data as FieldCreate, token);
            }
            setIsModalOpen(false);
        } catch (error) {
            // Error handling is managed inside the hook
        }
    };

    const columns = getFieldColumns(handleEdit, handleDelete);

    if (isLoading) {
        return <MainLoader />;
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Gestión de Canchas</h1>
                        <p className="text-slate-400">Administra las canchas disponibles en el sistema</p>
                    </div>
                    <Button onClick={handleCreate} leftIcon={<Plus size={20} />}>
                        Nueva Cancha
                    </Button>
                </div>

                <Card variant="glass" padding="lg">
                    <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Buscar por nombre o ubicación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                leftIcon={<Search size={18} />}
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="all">Todas las Canchas</option>
                            <option value="active">Activas</option>
                            <option value="inactive">Inactivas</option>
                        </select>
                    </div>

                    <Table
                        data={filteredFields}
                        columns={columns}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron canchas registradas"
                    />
                </Card>
            </motion.div>

            {/* Modal for Create/Edit */}
            <FieldFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                fieldToEdit={selectedField}
                isLoading={isLoading}
            />
        </div>
    );
};
