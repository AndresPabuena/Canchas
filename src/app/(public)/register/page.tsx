import { Metadata } from 'next';
import { RegisterView } from '@/modules/auth/views/RegisterView';

export const metadata: Metadata = {
    title: 'Registrarse | AgendaGol',
    description: 'Crea tu cuenta en AgendaGol y comienza a reservar canchas de fútbol',
};

export default function RegisterPage() {
    return <RegisterView />;
}
