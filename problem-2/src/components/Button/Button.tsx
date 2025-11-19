import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/utils';

export type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const AppButton: FC<AppButtonProps> = ({
  children,
  className,
  loading,
  disabled,
  ...restProps
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn('rounded-lg p-2 transition-all hover:scale-[101%]', className)}
      {...restProps}
    >
      <div className="relative">
        {loading && (
          <div className="abs-center flex h-full w-full items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-500 border-t-gray-100" />
          </div>
        )}
        <div className={cn({ invisible: loading })}>{children}</div>
      </div>
    </button>
  );
};
