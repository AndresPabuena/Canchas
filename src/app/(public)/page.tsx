import { Metadata } from 'next';
import { LandingView } from '@/modules/landing/views/LandingView';

export const metadata: Metadata = {
  title: 'AgendaGol - Reserva tu Cancha de Fútbol',
  description: 'Encuentra y reserva la cancha perfecta para tu próximo partido. Sistema fácil y rápido de reservas.',
};

export default function HomePage() {
  return <LandingView />;
}
