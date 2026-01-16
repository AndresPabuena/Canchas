import { Column } from '@/components/ui/Table';
import { Field } from '@/modules/fields/types';
import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

export const getFieldColumns = (
    onEdit: (field: Field) => void,
    onDelete: (field: Field) => void
): Column<Field>[] => [
        {
            header: 'Nombre',
            accessorKey: 'name',
            className: 'text-white font-medium'
        },
        {
            header: 'Ubicación',
            accessorKey: 'location',
            className: 'text-slate-300'
        },
        {
            header: 'Capacidad',
            render: (field: Field) => (
                <span className="text-slate-300">
                    {field.capacity}
                </span>
            )
        },
        {
            header: 'Precio/Hora',
            render: (field: Field) => (
                <span className="text-emerald-400 font-bold">
                    ${field.price_per_hour}
                </span>
            )
        },
        {
            header: 'Horario',
            render: (field: Field) => (
                <span className="text-slate-400 text-sm">
                    {field.opening_time} - {field.closing_time}
                </span>
            )
        },
        {
            header: 'Estado',
            render: (field: Field) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${field.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                    {field.is_active ? 'Activa' : 'Inactiva'}
                </span>
            )
        },
        {
            header: 'Acciones',
            render: (field: Field) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(field)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(field)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];
