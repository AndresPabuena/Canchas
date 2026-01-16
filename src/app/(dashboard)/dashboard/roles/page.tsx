import { Metadata } from 'next';
import { RolesView } from '@/modules/roles/views/RolesView';

export const metadata: Metadata = {
    title: 'Gestión de Roles | AgendaGol',
    description: 'Administrar roles y permisos del sistema',
};

export default function RolesPage() {
    return <RolesView />;
}
