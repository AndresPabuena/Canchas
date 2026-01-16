'use client';

import { useAuthStore } from '@/store/authStore';
import { UserDashboardView } from '@/modules/dashboard/views/UserDashboardView';
import { AdminDashboardView } from '@/modules/dashboard/views/AdminDashboardView';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MainLoader } from '@/components/ui/MainLoader';

export const DashboardView: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return <MainLoader />;
    }

    if (!isAuthenticated) {
        return null;
    }

    // Show admin dashboard for admin users, otherwise user dashboard
    return user?.is_admin ? <AdminDashboardView /> : <UserDashboardView />;
};
