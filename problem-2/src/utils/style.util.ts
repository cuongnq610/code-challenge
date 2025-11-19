import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: any[]) => {
  return twMerge(classNames(inputs));
};
