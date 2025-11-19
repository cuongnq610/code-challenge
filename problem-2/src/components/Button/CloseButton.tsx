import type { FC } from 'react';

import { cn } from '@/utils';

import { AppButton, type AppButtonProps } from './Button';

export type AppModalCloseButtonProps = AppButtonProps;

export const AppCloseButton: FC<AppModalCloseButtonProps> = ({ className, ...props }) => {
  return (
    <AppButton
      {...props}
      className={cn('rounded-full border border-gray-700 p-1 hover:bg-gray-800', className)}
    >
      <img src="/close.svg" alt="Close" className="h-4 w-4" />
    </AppButton>
  );
};
