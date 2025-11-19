import { type InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils';

export type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  borderless?: boolean;
  silentFocus?: boolean; // disable focus border effect
};

export type AppInputRef = HTMLInputElement;

export const AppInput = forwardRef<AppInputRef, AppInputProps>(
  ({ borderless: noBorder, silentFocus, className, ...restProps }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          { 'border-2 border-blue-500': !noBorder },
          { 'outline-0': silentFocus },
          'app-input w-full rounded-lg',
          className
        )}
        {...restProps}
      />
    );
  }
);
