import { Metadata } from 'next';
import { ForgotPasswordView } from '@/modules/auth/views/ForgotPasswordView';

export const metadata: Metadata = {
    title: 'Recuperar Contraseña | AgendaGol',
    description: 'Recupera el acceso a tu cuenta',
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordView />;
}
