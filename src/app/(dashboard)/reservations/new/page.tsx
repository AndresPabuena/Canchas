import { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateReservationView } from '@/modules/reservations/views/CreateReservationView';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Nueva Reserva | AgendaGol',
    description: 'Crea una nueva reserva de cancha',
};

function LoadingFallback() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        </div>
    );
}

export default function NewReservationPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <CreateReservationView />
        </Suspense>
    );
}
