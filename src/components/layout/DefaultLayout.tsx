import { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion } from 'framer-motion';

interface DefaultLayoutProps {
    children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-950 flex transition-all duration-300 relative overflow-hidden">
            {/* Background Animations - Fixed and behind everything */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-500/15 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 flex w-full">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <div
                    className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:pl-[280px]' : 'lg:pl-[80px]'
                        }`}
                >
                    <Header
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                        isSidebarOpen={isSidebarOpen}
                    />

                    <main className="flex-1 p-6 relative">
                        <div className="relative z-10 max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
