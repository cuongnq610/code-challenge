import { useCallback, useState } from 'react';

import type { ToastItem, ToastType } from '@/types';

export function useToastStore() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (message: string, options: { type?: ToastType; duration?: number } = {}) => {
      const id = Date.now() + Math.random();
      const duration = options.duration ?? 3000;

      const toast: ToastItem = {
        id,
        message,
        type: options.type ?? 'info',
        duration,
        leaving: false,
      };

      setToasts(prev => [...prev, toast]);

      // start exit animation slightly early
      setTimeout(() => {
        setToasts(prev => prev.map(t => (t.id === id ? { ...t, leaving: true } : t)));
      }, duration - 250);

      // remove after full exit
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    },
    []
  );

  return { toasts, addToast };
}
