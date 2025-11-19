import type { FC } from 'react';

import { AppButton, type AppButtonProps } from '@/components';
import { cn } from '@/utils';

export type SwapButtonProps = AppButtonProps;

export const SwapButton: FC<SwapButtonProps> = props => {
  return (
    <div className="relative w-full">
      <AppButton
        {...props}
        className={cn(
          'block h-12 w-12 cursor-pointer rounded-2xl p-3',
          'border-2 border-gray-700 bg-[#0d1421]',
          'abs-center'
        )}
      >
        <img src="/swap.svg" alt="Swap" className="rotate-90" />
      </AppButton>
    </div>
  );
};
