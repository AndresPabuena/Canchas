import { Menu, Bell, Search, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
    const { user, logout } = useAuthStore();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    return (
        <header className="h-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-30 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* Breadcrumb or Page Title could go here 
                <div className="hidden md:block text-slate-400 text-sm">
                    <span className="text-emerald-500 font-medium">Bienvenido</span>, {user?.username}
                </div>*/}
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar (Optional) 
                <div className="hidden md:flex items-center bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700/50 focus-within:border-emerald-500/50 focus-within:bg-slate-800 transition-all w-64">
                    <Search size={18} className="text-slate-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-500"
                    />
                </div>*/}

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                    >
                        <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                            <User size={20} className="text-emerald-400" />
                        </div>
                        <div className="hidden md:block text-left">
                            <div className="text-sm font-medium text-white leading-none mb-1">{user?.username}</div>
                            <div className="text-xs text-slate-500 leading-none">{user?.is_admin ? 'Administrador' : 'Usuario'}</div>
                        </div>
                        <ChevronDown size={16} className={`text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/50 overflow-hidden"
                            >
                                <div className="p-4 border-b border-slate-800">
                                    <p className="text-white font-medium truncate">{user?.username}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            router.push('/profile');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <User size={16} />
                                        Mi Perfil
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                        <Bell size={16} />
                                        Notificaciones
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};
