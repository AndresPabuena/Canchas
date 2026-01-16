'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { AdminFieldsView } from '@/modules/fields/views/AdminFieldsView';
import { FieldsListView } from '@/modules/fields/views/FieldsListView';
import { Loader2 } from 'lucide-react';

export const FieldsController: React.FC = () => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (user?.is_admin) {
        return <AdminFieldsView />;
    }

    return <FieldsListView />;
};
