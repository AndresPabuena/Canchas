'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'hover' | 'glass';
    onClick?: () => void;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'default',
    onClick,
    padding = 'md',
}) => {
    const baseStyles = 'rounded-2xl border';

    const variantStyles = {
        default: 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm',
        hover: 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer',
        glass: 'bg-white/5 border-white/10 backdrop-blur-xl',
    };

    const Component = onClick ? motion.div : 'div';
    const motionProps = onClick
        ? {
            whileHover: { scale: 1.02, y: -4 },
            whileTap: { scale: 0.98 },
            transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
        }
        : {};

    return (
        <Component
            className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
            onClick={onClick}
            {...motionProps}
        >
            {children}
        </Component>
    );
};

// Card subcomponents
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <h3 className={`text-xl font-bold text-white ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <p className={`text-slate-400 text-sm mt-1 ${className}`}>{children}</p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={className}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={`mt-4 pt-4 border-t border-slate-700/50 ${className}`}>{children}</div>
);
