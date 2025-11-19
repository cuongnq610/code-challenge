import {
  type PropsWithChildren,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@/hooks';
import { cn } from '@/utils';

import { AppCloseButton } from '../Button';

export type AppModalProps = PropsWithChildren & {
  onClose?: () => void;
};

export type AppModalRef = {
  open: () => void;
  close: () => void;
};

export const AppModal = forwardRef<AppModalRef, AppModalProps>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // This state is used to trigger the closing animation
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const modalContentRef = useClickOutside<HTMLDivElement>(() => {
    setIsClosing(true);
  });

  const open = () => {
    setIsOpen(true);
    setIsClosing(false);
  };
  const close = () => {
    setIsClosing(true);
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isClosing]);

  if (!isOpen) return null;

  return createPortal(
    <div className={cn('app-modal', 'fixed inset-0 z-50 flex items-center justify-center')}>
      {/* Overlay Element */}
      <div className="app-modal__overlay absolute h-full w-full bg-gray-900 opacity-20" />

      {/* Modal Content */}
      <div
        ref={modalContentRef}
        className={cn(
          'z-10 rounded-lg border border-gray-700 bg-[#0d1421] p-4 shadow-lg',
          { 'animate-fade-in': isOpen && !isClosing },
          { 'animate-fade-out': isClosing }
        )}
      >
        {children}

        <AppCloseButton onClick={close} className="absolute top-4 right-4" />
      </div>
    </div>,
    document.body
  );
});
