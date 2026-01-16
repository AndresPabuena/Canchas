import { Metadata } from 'next';
import { LoginView } from '@/modules/auth/views/LoginView';

export const metadata: Metadata = {
    title: 'Iniciar Sesión | AgendaGol',
    description: 'Inicia sesión en tu cuenta de AgendaGol para reservar canchas de fútbol',
};

export default function LoginPage() {
    return <LoginView />;
}
