import { Metadata } from 'next';
import { DashboardView } from '@/modules/dashboard/views/DashboardView';

export const metadata: Metadata = {
    title: 'Dashboard | AgendaGol',
    description: 'Panel de control de AgendaGol',
};

export default function DashboardPage() {
    return <DashboardView />;
}
