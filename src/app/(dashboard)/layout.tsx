'use client';

import { DefaultLayout } from '@/components/layout/DefaultLayout';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    );
}
