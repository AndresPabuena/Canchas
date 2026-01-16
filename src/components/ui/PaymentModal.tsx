import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    CreditCard,
    CheckCircle,
    Loader2,
    ShieldCheck,
    Smartphone,
    Globe,
    DollarSign,
    Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    fieldName: string;
    date: string;
    time: string;
    price: number;
    onPaymentSuccess: () => void;
}

type PaymentStatus = 'summary' | 'payment' | 'processing' | 'success';
type PaymentMethod = 'card' | 'pse' | 'nequi' | 'daviplata';

export const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    fieldName,
    date,
    time,
    price,
    onPaymentSuccess
}) => {
    const [status, setStatus] = useState<PaymentStatus>('summary');
    const [method, setMethod] = useState<PaymentMethod>('card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatus('summary');
            setMethod('card');
            setCardNumber('');
            setCardName('');
            setExpiry('');
            setCvc('');
        }
    }, [isOpen]);

    const handleProcessPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('processing');

        // Mock processing delay
        setTimeout(() => {
            setStatus('success');
        }, 2500);
    };

    const handleFinish = () => {
        onPaymentSuccess();
        onClose();
    };

    const renderSummary = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full"
        >
            <div className="bg-slate-50 p-6 rounded-t-xl border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">P</div>
                        <span className="font-bold text-slate-800 text-lg">Resumen de Compra</span>
                    </div>
                    <div className="text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded text-xs font-semibold">
                        <ShieldCheck size={14} />
                        Seguro
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">{fieldName}</h3>
                    <p className="text-slate-500 text-sm">{date} - {time}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-b-xl flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium text-slate-800">${price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600">IVA (19%)</span>
                        <span className="font-medium text-slate-800">$0</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-lg font-bold text-slate-800">Total a Pagar</span>
                        <span className="text-2xl font-bold text-orange-600">${price.toLocaleString()}</span>
                    </div>
                </div>

                <Button
                    fullWidth
                    size="lg"
                    onClick={() => setStatus('payment')}
                    className="mt-6 bg-orange-600 hover:bg-orange-700 text-white border-none shadow-orange-500/20 shadow-lg"
                >
                    Continuar al Pago
                </Button>
            </div>
        </motion.div>
    );

    const renderPayment = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row h-full overflow-hidden bg-white rounded-xl"
        >
            {/* Sidebar Methods */}
            <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Medios de Pago</h4>
                <div className="space-y-2">
                    <button
                        onClick={() => setMethod('card')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${method === 'card' ? 'bg-white shadow-md border border-orange-200 text-orange-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <CreditCard size={20} />
                        <span className="font-medium text-sm">Tarjeta Crédito/Débito</span>
                    </button>
                    <button
                        onClick={() => setMethod('pse')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${method === 'pse' ? 'bg-white shadow-md border border-orange-200 text-orange-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Globe size={20} />
                        <span className="font-medium text-sm">PSE</span>
                    </button>
                    <button
                        onClick={() => setMethod('nequi')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${method === 'nequi' ? 'bg-white shadow-md border border-orange-200 text-orange-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Smartphone size={20} />
                        <span className="font-medium text-sm">Nequi</span>
                    </button>
                    <button
                        onClick={() => setMethod('daviplata')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${method === 'daviplata' ? 'bg-white shadow-md border border-orange-200 text-orange-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <DollarSign size={20} />
                        <span className="font-medium text-sm">Daviplata</span>
                    </button>
                </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 p-6 relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-50">
                    <div className="w-8 h-5 bg-slate-300 rounded"></div>
                    <div className="w-8 h-5 bg-slate-300 rounded"></div>
                    <div className="w-8 h-5 bg-slate-300 rounded"></div>
                </div>

                {method === 'card' ? (
                    <form onSubmit={handleProcessPayment} className="space-y-5">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Información de Tarjeta</h3>
                            <p className="text-xs text-slate-500">Transacción encriptada y segura.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Número de Tarjeta</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-slate-400"
                                        placeholder="0000 0000 0000 0000"
                                        value={cardNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                                            setCardNumber(val.replace(/(.{4})/g, '$1 ').trim());
                                        }}
                                        required
                                    />
                                    <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vencimiento</label>
                                    <input
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-slate-400"
                                        placeholder="MM/YY"
                                        value={expiry}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                            val.length >= 2 ? setExpiry(`${val.slice(0, 2)}/${val.slice(2)}`) : setExpiry(val);
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">CVC</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 pl-4 pr-10 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-slate-400"
                                            placeholder="123"
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                            type="password"
                                            required
                                        />
                                        <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del Titular</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-slate-400"
                                    placeholder="JUAN PEREZ"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                fullWidth
                                className="bg-orange-600 hover:bg-orange-700 text-white border-none shadow-lg shadow-orange-500/20"
                            >
                                Pagar ${price.toLocaleString()}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Lock className="text-slate-400" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 mb-2">Método en Mantenimiento</h3>
                        <p className="text-slate-500 text-sm mb-6">Estamos conectando con el banco. Por favor intenta con tarjeta de crédito.</p>
                        <Button variant="outline" size="sm" onClick={() => setMethod('card')} className="text-orange-600 border-orange-200 hover:bg-orange-50">
                            Usar Tarjeta
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );

    const renderProcessing = () => (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl h-full">
            <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="text-orange-500" size={24} />
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Procesando Transacción</h3>
            <p className="text-slate-500 text-sm max-w-xs px-6">
                Conectando con tu banco de forma segura. Por favor no cierres esta ventana.
            </p>
        </div>
    );

    const renderSuccess = () => (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl h-full">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
                <CheckCircle size={48} className="text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Transacción Aprobada!</h3>
            <div className="bg-slate-50 px-6 py-3 rounded-lg mb-8 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Referencia de Pago</p>
                <p className="text-lg font-mono font-bold text-slate-800">EP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <Button onClick={handleFinish} className="bg-orange-600 hover:bg-orange-700 text-white min-w-[200px]">
                Finalizar
            </Button>
        </div>
    );

    // Override the base modal content to create a full custom look within the modal wrapper
    // We'll use a transparent modal background approach if possible, or just style purely inside

    return (
        <Modal
            isOpen={isOpen}
            onClose={status === 'processing' || status === 'success' ? () => { } : onClose}
            title=""
            size="lg"
        // We might want to remove default styling, but for now we work within it. 
        // The modal component usually adds a header. We passed empty title to minimize it.
        >
            <div className="h-[550px] bg-slate-100 rounded-xl overflow-hidden flex flex-col relative">
                {/* Brand Header */}
                <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                    <span className="text-2xl font-extrabold italic text-slate-800 tracking-tighter">e<span className="text-orange-600">Payco</span></span>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <Lock size={12} />
                        CONNECTION SECURE © 2026
                    </div>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {status === 'summary' && renderSummary()}
                        {status === 'payment' && renderPayment()}
                        {status === 'processing' && renderProcessing()}
                        {status === 'success' && renderSuccess()}
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    );
};
