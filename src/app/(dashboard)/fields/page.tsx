import { Metadata } from 'next';
import { FieldsController } from '@/modules/fields/views/FieldsController';

export const metadata: Metadata = {
    title: 'Gestión de Canchas | AgendaGol',
    description: 'Administra o reserva nuestras canchas de fútbol',
};

export default function FieldsPage() {
    return <FieldsController />;
}
