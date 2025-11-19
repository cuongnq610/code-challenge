export type ToastType = 'success' | 'error' | 'info';

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  leaving: boolean;
};

export type BroadcastToastMessage = {
  message: string;
  options?: {
    type?: ToastType;
    duration?: number;
  };
};
