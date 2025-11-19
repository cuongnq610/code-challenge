import type { FC } from 'react';

import { cn } from '@/utils';

import { AppInput, type AppInputProps } from './Input';

export type AppInputSearchProps = AppInputProps;

export const AppInputSearch: FC<AppInputSearchProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn('relative', className)}>
      <AppInput className={'w-full px-3 py-1 pl-8 outline-0'} {...restProps} />
      <img alt="Search" src="/search.svg" className="abs-center-y left-3 h-4 w-4" />
    </div>
  );
};
