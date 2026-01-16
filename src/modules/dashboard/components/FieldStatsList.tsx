import React, { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/Card';
import { FieldStats } from '@/modules/dashboard/types';
import { FieldDetailsModal } from './FieldDetailsModal';
import { ChevronRight } from 'lucide-react';

interface FieldStatsListProps {
    fields: FieldStats[];
}

export const FieldStatsList: React.FC<FieldStatsListProps> = ({ fields }) => {
    const [selectedField, setSelectedField] = useState<FieldStats | null>(null);

    return (
        <>
            <Card variant="glass" padding="lg">
                <CardTitle className="mb-6">Estadísticas por Cancha</CardTitle>
                {fields.length > 0 ? (
                    <div className="space-y-4 max-h-[261px] overflow-y-auto pr-2 custom-scrollbar">
                        {fields.map((field) => (
                            <div
                                key={field.field_id}
                                onClick={() => setSelectedField(field)}
                                className="group flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800/80 rounded-xl cursor-pointer transition-all border border-transparent hover:border-slate-700"
                            >
                                <div className="w-10 h-10 bg-emerald-500/20 group-hover:bg-emerald-500/30 rounded-lg flex items-center justify-center transition-colors">
                                    <span className="text-lg">⚽</span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                                        {field.field_name}
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        {field.confirmed_reservations} reservas
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <div>
                                        <div className="font-bold text-emerald-400">
                                            ${field.total_revenue?.toLocaleString() || 0}
                                        </div>
                                        <div className="text-xs text-slate-500">ingresos</div>
                                    </div>
                                    <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-400">
                        No hay datos de canchas disponibles
                    </div>
                )}
            </Card>

            <FieldDetailsModal
                isOpen={!!selectedField}
                onClose={() => setSelectedField(null)}
                field={selectedField}
            />
        </>
    );
};
