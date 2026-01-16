import { Metadata } from 'next';
import { MyReservationsView } from '@/modules/reservations/views/MyReservationsView';

export const metadata: Metadata = {
    title: 'Mis Reservas | AgendaGol',
    description: 'Gestiona tus reservas de canchas de fútbol',
};

export default function ReservationsPage() {
    return <MyReservationsView />;
}
