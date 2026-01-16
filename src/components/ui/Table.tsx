import React from 'react';
import { Loader2 } from 'lucide-react';

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export const Table = <T,>({
    data,
    columns,
    isLoading = false,
    emptyMessage = 'No hay datos disponibles'
}: TableProps<T>) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-700">
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`p-4 text-slate-400 font-medium ${col.className || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-800/30 transition-colors">
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`p-4 ${col.className || ''}`}
                                    >
                                        {col.render
                                            ? col.render(item)
                                            : col.accessorKey
                                                ? String(item[col.accessorKey])
                                                : '-'}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="p-8 text-center text-slate-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
