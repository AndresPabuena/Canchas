import React from 'react';
import { motion } from 'framer-motion';

interface CreditCardProps {
    holderName: string;
    cardNumber: string; // **** **** **** 1234
    expiryDate: string; // MM/YY
    variant?: 'primary' | 'secondary' | 'dark';
}

export const CreditCard: React.FC<CreditCardProps> = ({
    holderName,
    cardNumber,
    expiryDate,
    variant = 'primary'
}) => {
    const getGradient = () => {
        switch (variant) {
            case 'primary':
                return 'bg-gradient-to-br from-emerald-500 to-green-700';
            case 'secondary':
                return 'bg-gradient-to-br from-blue-500 to-indigo-700';
            case 'dark':
                return 'bg-gradient-to-br from-slate-700 to-slate-900';
            default:
                return 'bg-gradient-to-br from-emerald-500 to-green-700';
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 text-white shadow-xl overflow-hidden ${getGradient()}`}
        >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-md border border-white/30" />
                    <span className="text-xl font-bold tracking-widest italic opacity-80">VISA</span>
                </div>

                <div className="space-y-6">
                    <div className="text-2xl tracking-widest font-mono drop-shadow-md">
                        {cardNumber}
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-xs opacity-70 mb-1 uppercase tracking-wider">Titular</div>
                            <div className="font-medium tracking-wide uppercase">{holderName}</div>
                        </div>
                        <div>
                            <div className="text-xs opacity-70 mb-1 uppercase tracking-wider text-right">Expira</div>
                            <div className="font-medium tracking-wide">{expiryDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
