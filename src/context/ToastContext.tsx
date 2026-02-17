import { createContext, useContext, useState, useCallback } from 'react';
import type { Toast, ToastType, ToastContextValue } from './ToastContext.types';

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType, duration: number = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods
  const success = useCallback((message: string, duration?: number) => {
    addToast(message, 'success', duration);
  }, [addToast]);

  const error = useCallback((message: string, duration?: number) => {
    addToast(message, 'error', duration);
  }, [addToast]);

  const warning = useCallback((message: string, duration?: number) => {
    addToast(message, 'warning', duration);
  }, [addToast]);

  const info = useCallback((message: string, duration?: number) => {
    addToast(message, 'info', duration);
  }, [addToast]);

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
