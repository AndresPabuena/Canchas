'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Field, FieldCreate, FieldUpdate } from '@/modules/fields/types';
import { Clock, DollarSign, MapPin, Type, Users } from 'lucide-react';

interface FieldFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FieldCreate | FieldUpdate) => Promise<void>;
    fieldToEdit?: Field | null; // If provided, mode is EDIT, else CREATE
    isLoading?: boolean;
}

export const FieldFormModal: React.FC<FieldFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    fieldToEdit,
    isLoading = false
}) => {
    // Form state
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [description, setDescription] = useState('');
    const [openingTime, setOpeningTime] = useState('08:00');
    const [closingTime, setClosingTime] = useState('22:00');
    const [isActive, setIsActive] = useState(true);

    // Initialize form when opening or changing fieldToEdit
    useEffect(() => {
        if (isOpen) {
            if (fieldToEdit) {
                // Edit mode
                setName(fieldToEdit.name);
                setLocation(fieldToEdit.location);
                setCapacity(fieldToEdit.capacity.toString());
                setPricePerHour(fieldToEdit.price_per_hour.toString());
                setDescription(fieldToEdit.description || '');
                setOpeningTime(fieldToEdit.opening_time);
                setClosingTime(fieldToEdit.closing_time);
                setIsActive(fieldToEdit.is_active);
            } else {
                // Create mode: reset
                setName('');
                setLocation('');
                setCapacity('');
                setPricePerHour('');
                setDescription('');
                setOpeningTime('08:00');
                setClosingTime('22:00');
                setIsActive(true);
            }
        }
    }, [isOpen, fieldToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const numericCapacity = parseInt(capacity);
        const numericPrice = parseFloat(pricePerHour);

        if (isNaN(numericCapacity) || isNaN(numericPrice)) {
            // Basic validation - usually handled better but keeping it simple
            return;
        }

        const formData: FieldCreate | FieldUpdate = {
            name,
            location,
            capacity: numericCapacity,
            price_per_hour: numericPrice,
            description,
            opening_time: openingTime,
            closing_time: closingTime,
            is_active: isActive
        };

        await onSubmit(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={fieldToEdit ? 'Editar Cancha' : 'Nueva Cancha'}
            size="2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <Input
                            label="Nombre de la Cancha"
                            placeholder="Ej. Cancha Principal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            leftIcon={<Type size={18} />}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                        <Input
                            label="Ubicación"
                            placeholder="Ej. Zona Norte, Bloque A"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            leftIcon={<MapPin size={18} />}
                            required
                        />
                    </div>

                    {/* Capacity */}
                    <div>
                        <Input
                            label="Capacidad (Jugadores)"
                            type="number"
                            placeholder="Ej. 10"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            leftIcon={<Users size={18} />}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <Input
                            label="Precio por Hora"
                            type="number"
                            placeholder="Ej. 25.00"
                            value={pricePerHour}
                            onChange={(e) => setPricePerHour(e.target.value)}
                            leftIcon={<DollarSign size={18} />}
                            required
                        />
                    </div>

                    {/* Schedules */}
                    <div>
                        <Input
                            label="Hora de Apertura"
                            type="time"
                            value={openingTime}
                            onChange={(e) => setOpeningTime(e.target.value)}
                            leftIcon={<Clock size={18} />}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            label="Hora de Cierre"
                            type="time"
                            value={closingTime}
                            onChange={(e) => setClosingTime(e.target.value)}
                            leftIcon={<Clock size={18} />}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Descripción (Opcional)
                        </label>
                        <textarea
                            className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none h-24"
                            placeholder="Detalles adicionales sobre la cancha..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                    >
                        {fieldToEdit ? 'Guardar Cambios' : 'Crear Cancha'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
