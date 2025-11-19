import type { BroadcastToastMessage, ToastType } from '@/types';

export const createToastChannel = () => new BroadcastChannel('toast-channel');

export const broadcastToast = (message: string, options: BroadcastToastMessage['options'] = {}) => {
  const toastChannel = createToastChannel();

  const payload: BroadcastToastMessage = { message, options };
  toastChannel.postMessage(payload);

  toastChannel.close();
};

export const toastSuccess = (message: string) => {
  toast(message, { type: 'success' });
};

export const toastError = (message: string) => {
  toast(message, { type: 'error' });
};

export const toastInfo = (message: string) => {
  toast(message, { type: 'info' });
};

export const toast = (message: string, options?: { type?: ToastType; duration?: number }) => {
  broadcastToast(message, options);
};
