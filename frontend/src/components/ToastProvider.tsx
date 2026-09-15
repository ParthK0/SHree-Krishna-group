import React, { useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { ToastContext, type ToastItem, type ToastType } from '../lib/useToast';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const duration = toast.duration ?? 4500;
    const newToast: ToastItem = { ...toast, id, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, [dismissToast]);

  const success = useCallback((message: string, title?: string) => {
    return showToast({ type: 'success', message, title });
  }, [showToast]);

  const error = useCallback((message: string, title?: string) => {
    return showToast({ type: 'error', message, title });
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    return showToast({ type: 'warning', message, title });
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    return showToast({ type: 'info', message, title });
  }, [showToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        warning,
        info,
        dismissToast
      }}
    >
      {children}

      {/* Floating Toast Notification Viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-300 transform translate-y-0 ${getToastStyles(
              toast.type
            )}`}
            role="alert"
          >
            <div className="shrink-0 mt-0.5">{getToastIcon(toast.type)}</div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-sm font-semibold tracking-tight mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-stone-400 hover:text-stone-700 transition p-1 -mr-1 -mt-1 rounded-md hover:bg-black/5"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

function getToastIcon(type: ToastType) {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-rose-600" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    case 'info':
    default:
      return <Info className="w-5 h-5 text-blue-600" />;
  }
}

function getToastStyles(type: ToastType) {
  switch (type) {
    case 'success':
      return 'bg-white text-stone-900 border-emerald-200 shadow-emerald-950/5';
    case 'error':
      return 'bg-white text-stone-900 border-rose-200 shadow-rose-950/5';
    case 'warning':
      return 'bg-white text-stone-900 border-amber-200 shadow-amber-950/5';
    case 'info':
    default:
      return 'bg-white text-stone-900 border-blue-200 shadow-blue-950/5';
  }
}
