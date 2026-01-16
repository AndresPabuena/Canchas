'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    LogIn,
    UserPlus,
    LogOut,
    User
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
        setIsMobileMenuOpen(false);
    };

    // Don't show navbar on login/register pages
    if (pathname === '/login' || pathname === '/register') {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <span className="text-xl">⚽</span>
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">AgendaGol</span>
                    </Link>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-xl">
                                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                        <User size={16} className="text-emerald-400" />
                                    </div>
                                    <span className="text-slate-300 text-sm">{user?.username}</span>
                                    {user?.is_admin && (
                                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                                            Admin
                                        </span>
                                    )}
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    <LogOut size={18} className="mr-1" />
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        <LogIn size={18} className="mr-1" />
                                        Ingresar
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">
                                        <UserPlus size={18} className="mr-1" />
                                        Registrarse
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-t border-slate-800"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            <div className="space-y-2">
                                {isAuthenticated ? (
                                    <>
                                        <div className="flex items-center gap-3 px-4 py-2">
                                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                                <User size={20} className="text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{user?.username}</div>
                                                <div className="text-slate-500 text-sm">{user?.email}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
                                        >
                                            <LogOut size={20} />
                                            Cerrar Sesión
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
                                        >
                                            <LogIn size={20} />
                                            Ingresar
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500 text-white"
                                        >
                                            <UserPlus size={20} />
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
