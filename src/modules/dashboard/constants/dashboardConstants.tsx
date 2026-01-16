import { Column } from '@/components/ui/Table';
import { DashboardUser, DashboardReservation } from '@/modules/dashboard/types';

export const USERS_COLUMNS: Column<DashboardUser>[] = [
    { header: 'Usuario', accessorKey: 'username', className: 'text-white font-medium' },
    { header: 'Email', accessorKey: 'email', className: 'text-slate-300' },
    {
        header: 'Rol',
        render: (user: DashboardUser) => (
            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${user.is_admin ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                {user.is_admin ? 'Admin' : 'Usuario'}
            </span>
        )
    },
    {
        header: 'Estado',
        render: (user: DashboardUser) => (
            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${user.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                {user.is_active ? 'Activo' : 'Inactivo'}
            </span>
        )
    }
];

export const RESERVATIONS_COLUMNS: Column<DashboardReservation>[] = [
    { header: 'Cancha', accessorKey: 'field_name', className: 'text-white font-medium' },
    { header: 'Usuario', accessorKey: 'user_email', className: 'text-slate-300' },
    {
        header: 'Fecha Inicio',
        render: (res: DashboardReservation) => (
            <span className="text-slate-300">
                {new Date(res.start_time).toLocaleDateString()}
                <span className="text-slate-500 text-xs ml-2">
                    {new Date(res.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </span>
        )
    },

    {
        header: 'Fecha Fin',
        render: (res: DashboardReservation) => (
            <span className="text-slate-300">
                {new Date(res.end_time).toLocaleDateString()}
                <span className="text-slate-500 text-xs ml-2">
                    {new Date(res.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </span>
        )
    },
    {
        header: 'Estado',
        render: (res: DashboardReservation) => (
            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${res.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                res.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                    'bg-amber-500/10 text-amber-400'
                }`}>
                {res.status === 'confirmed' ? 'Confirmada' :
                    res.status === 'cancelled' ? 'Cancelada' : res.status}
            </span>
        )
    },
    {
        header: 'Total',
        render: (res: DashboardReservation) => (
            <span className="text-emerald-400 font-bold">
                ${res.total_price?.toLocaleString()}
            </span>
        )
    }
];
