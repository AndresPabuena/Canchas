import { Metadata } from 'next';
import { ReservationsOverviewView } from '@/modules/dashboard/views/ReservationsOverviewView';

export const metadata: Metadata = {
    title: 'Resumen de Reservas | AgendaGol Admin',
    description: 'Visión general de todas las reservas del sistema',
};

export default function ReservationsOverviewPage() {
    return <ReservationsOverviewView />;
}
