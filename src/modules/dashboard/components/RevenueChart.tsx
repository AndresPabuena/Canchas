'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

interface RevenueData {
    date: string;
    revenue: number;
    reservations: number;
}

interface RevenueChartProps {
    data: RevenueData[];
    isLoading?: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, isLoading = false }) => {
    // Ensure data is always an array
    const chartData = Array.isArray(data) ? data : [];

    if (isLoading) {
        return (
            <div className="h-80 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (chartData.length === 0) {
        return (
            <div className="h-80 flex items-center justify-center text-slate-400">
                No hay datos de ingresos disponibles
            </div>
        );
    }

    const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickFormatter={formatCurrency}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: '#f8fafc'
                        }}
                        formatter={(value, name) => {
                            const numValue = value as number;
                            return [
                                name === 'revenue' ? formatCurrency(numValue) : numValue,
                                name === 'revenue' ? 'Ingresos' : 'Reservas'
                            ];
                        }}
                        labelStyle={{ color: '#94a3b8' }}
                    />
                    <Legend
                        wrapperStyle={{ color: '#94a3b8' }}
                        formatter={(value) => value === 'revenue' ? 'Ingresos' : 'Reservas'}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#10b981' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="reservations"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
