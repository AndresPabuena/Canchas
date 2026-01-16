import { Metadata } from 'next';
import { ProfileView } from '@/modules/profile/views/ProfileView';

export const metadata: Metadata = {
    title: 'Mi Perfil | AgendaGol',
    description: 'Gestiona tu información personal',
};

export default function ProfilePage() {
    return <ProfileView />;
}
