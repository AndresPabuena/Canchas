'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className = '', type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-0 bottom-0 flex items-center text-slate-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={`
              w-full px-4 py-3 
              ${leftIcon ? 'pl-10' : ''} 
              ${rightIcon || isPassword ? 'pr-10' : ''}
              bg-slate-800/50 
              border ${error ? 'border-red-500' : 'border-slate-700'} 
              rounded-xl 
              text-white 
              placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
              transition-all duration-200
 
              ${className}
            `}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-0 bottom-0 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                    {rightIcon && !isPassword && (
                        <div className="absolute right-3 top-0 bottom-0 flex items-center text-slate-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
                {helperText && !error && <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
