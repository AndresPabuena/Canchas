import { Metadata } from 'next';
import { UsersListView } from '@/modules/dashboard/views/UsersListView';

export const metadata: Metadata = {
    title: 'Lista de Usuarios | AgendaGol Admin',
    description: 'Administración de usuarios registrados',
};

export default function UsersListPage() {
    return <UsersListView />;
}
