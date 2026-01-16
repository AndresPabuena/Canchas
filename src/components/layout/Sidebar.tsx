import {
    LayoutDashboard,
    MapPin,
    Calendar,
    LogOut,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    interface SidebarLink {
        href: string;
        label: string;
        icon: any; // Using any for Lucide icon component type to avoid complex type definition
        subItems?: { href: string; label: string }[];
    }

    const links: SidebarLink[] = [
        {
            href: '/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            subItems: user?.is_admin ? [
                { href: '/dashboard/users', label: 'Lista de Usuarios' },
                { href: '/dashboard/reservations', label: 'Resumen Reservas' },
                { href: '/dashboard/roles', label: 'Gestión de Roles' }
            ] : undefined
        },
        { href: '/fields', label: 'Canchas', icon: MapPin },
        { href: '/reservations', label: 'Mis Reservas', icon: Calendar },
    ];

    const sidebarVariants = {
        open: { x: 0, width: '280px', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
        closed: { x: isMobile ? '-100%' : 0, width: isMobile ? '280px' : '80px', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <motion.aside
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={sidebarVariants}
                className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 z-50 flex flex-col ${isOpen ? 'shadow-2xl shadow-emerald-500/10' : ''
                    }`}
            >
                {/* Desktop Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden md:flex absolute -right-3 top-9 z-50 bg-slate-900 border border-slate-700 rounded-md p-1 text-slate-400 hover:text-white hover:border-emerald-500 transition-all shadow-lg"
                >
                    {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                            <span className="text-xl">⚽</span>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="text-xl font-bold text-white whitespace-nowrap overflow-hidden"
                                >
                                    AgendaGol
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>



                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {links.map((link) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        const hasSubItems = link.subItems && link.subItems.length > 0;
                        const isSubMenuOpen = link.label === 'Dashboard' ? true : false; // For now, keep Dashboard open if it has items or manage state

                        if (hasSubItems) {
                            return (
                                <div key={link.href} className="space-y-1">
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${isActive
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }`}
                                        title={!isOpen ? link.label : undefined}
                                    >
                                        <link.icon size={22} className={`shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`} />
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    className="font-medium whitespace-nowrap overflow-hidden"
                                                >
                                                    {link.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                        {isActive && !isOpen && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
                                        )}
                                    </Link>

                                    {/* Submenu */}
                                    {isOpen && isSubMenuOpen && (
                                        <div className="pl-12 space-y-1">
                                            {link.subItems?.map((subItem) => {
                                                const isSubActive = pathname === subItem.href;
                                                return (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        className={`block py-2 text-sm transition-colors ${isSubActive
                                                            ? 'text-emerald-400 font-medium'
                                                            : 'text-slate-500 hover:text-white'
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${isActive
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                title={!isOpen ? link.label : undefined}
                            >
                                <link.icon size={22} className={`shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`} />

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="font-medium whitespace-nowrap overflow-hidden"
                                        >
                                            {link.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => {
                            logout();
                            router.push('/');
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all group ${isOpen
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'text-slate-400 hover:text-red-400 justify-center'
                            }`}
                        title={!isOpen ? "Cerrar Sesión" : undefined}
                    >
                        <LogOut size={22} className="shrink-0" />
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="font-medium whitespace-nowrap overflow-hidden"
                                >
                                    Cerrar Sesión
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.aside>
        </>
    );
};
