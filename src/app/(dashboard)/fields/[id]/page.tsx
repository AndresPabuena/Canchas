import { Metadata } from 'next';
import { FieldDetailView } from '@/modules/fields/views/FieldDetailView';

export const metadata: Metadata = {
    title: 'Detalle de Cancha | AgendaGol',
    description: 'Ver disponibilidad y reservar esta cancha de fútbol',
};

interface FieldDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function FieldDetailPage({ params }: FieldDetailPageProps) {
    const { id } = await params;
    const fieldId = parseInt(id, 10);

    if (isNaN(fieldId)) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Cancha no encontrada</h1>
                    <p className="text-slate-400">El ID de la cancha no es válido</p>
                </div>
            </div>
        );
    }

    return <FieldDetailView fieldId={fieldId} />;
}
