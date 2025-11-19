import type { FC, PropsWithChildren } from 'react';

import { cn } from '@/utils';

export type AppCardProps = PropsWithChildren & {
  className?: string;
};

export const AppCard: FC<AppCardProps> = ({ children, className }) => {
  return <div className={cn('rounded-2xl bg-[#222531] p-4 shadow-md', className)}>{children}</div>;
};
