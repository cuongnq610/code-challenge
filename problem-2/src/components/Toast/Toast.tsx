import { type FC, type PropsWithChildren, createContext, useContext, useEffect } from 'react';

import { useToastStore } from '@/hooks';
import type { BroadcastToastMessage, ToastType } from '@/types';
import { createToastChannel } from '@/utils';

interface ToastContextValue {
  addToast: (message: string, options?: { type?: ToastType; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
export const useToast = () => useContext(ToastContext)!;

const colors: Record<ToastType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

export type AppToastProviderProps = PropsWithChildren;

export const AppToastProvider: FC<AppToastProviderProps> = ({ children }) => {
  const { toasts, addToast } = useToastStore();

  useEffect(() => {
    const toastChannel = createToastChannel();

    toastChannel.onmessage = (event: MessageEvent<BroadcastToastMessage>) => {
      const { message, options } = event.data;
      addToast(message, options);
    };

    return () => {
      toastChannel.close();
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed right-6 bottom-6 z-50 flex w-80 flex-col gap-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`relative flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 p-4 text-white shadow-lg backdrop-blur-md ${toast.leaving ? 'animate-toastExit' : 'animate-toastEnter'} `}
          >
            {/* Colored dot */}
            <div className={`h-3 w-3 rounded-full ${colors[toast.type]}`} />

            {/* Toast message */}
            <div className="text-sm font-medium">{toast.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
