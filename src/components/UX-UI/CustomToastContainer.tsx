"use client";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BadgeCheck, CircleX, Info, TriangleAlert } from "lucide-react";

const toastStyles = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .Toastify__close-button {
    color: #ffffff !important;
    opacity: 0.8;
  }
  .Toastify__close-button:hover {
    opacity: 1;
  }
  .Toastify__toast-body {
    text-align: center;
    width: 100%;
    white-space: pre-line;
  }
  .Toastify__toast {
    min-width: 400px;
  }
    .Toastify__toast-container {
      z-index: 99999 !important;
    }
  .Toastify__toast--close {
    animation: slideOut 0.3s ease-out forwards;
  }
  .Toastify__toast-icon {
    width: 24px !important;
  }
  .Toastify__toast-icon svg {
    width: 24px !important;
    height: 24px !important;
  }
  :root {
    --toastify-color-light: #1e293b;
    --toastify-color-dark: #1e293b;
    --toastify-color-info: #3b82f6;
    --toastify-color-success: #10b981;
    --toastify-color-warning: #eab308;
    --toastify-color-error: #ef4444;
  }
`;

// Función para reproducir sonidos
const playSound = (frequency: number, duration: number = 200) => {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const customToast = {
  success: (message: string, options?: ToastOptions) => {
    playSound(800, 150);
    toast.success(message, options);
  },
  error: (message: string, options?: ToastOptions) => {
    playSound(200, 300);
    toast.error(message, options);
  },
  info: (message: string, options?: ToastOptions) => {
    playSound(600, 150);
    toast.info(message, options);
  },
  warning: (message: string, options?: ToastOptions) => {
    playSound(400, 200);
    toast.warning(message, options);
  },
};

export default function CustomToastContainer() {
  return (
    <>
      <style>{toastStyles}</style>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        icon={({ type }: { type: string }) => {
          switch (type) {
            case 'info':
              return <Info className="stroke-blue-500" size={24} />;
            case 'error':
              return <CircleX className="stroke-red-500" size={24} />;
            case 'success':
              return <BadgeCheck className="stroke-green-500" size={24} />;
            case 'warning':
              return <TriangleAlert className="stroke-yellow-500" size={24} />;
            default:
              return null;
          }
        }}
        toastStyle={{
          backgroundColor: '#1e293b', // slate-800
          color: '#f8fafc', // slate-50
          borderRadius: '12px',
          border: '1px solid #334155', // slate-700
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          fontWeight: '500',
        }}
      />
    </>
  );
}
