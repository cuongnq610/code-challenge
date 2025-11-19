import { type FC, useEffect, useRef, useState } from 'react';

import { validateNumber } from '@/utils';

import { AppInput, type AppInputProps } from './Input';

export type AppInputNumberProps = AppInputProps & {
  allowDecimal?: boolean;
  allowNegative?: boolean;
  onChangeValue?: (val: string) => void;
};

export const AppInputNumber: FC<AppInputNumberProps> = ({
  value: valueProps,
  onChange,
  allowDecimal = true,
  allowNegative = true,
  onChangeValue,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(valueProps?.toString() ?? '');
  }, [valueProps]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const isValid = validateNumber({ value: newValue, allowDecimal, allowNegative });

    if (newValue && !isValid) return;

    setValue(newValue);
    onChangeValue?.(newValue);
  };

  return (
    <AppInput ref={inputRef} type="tel" value={value} onChange={handleChange} {...restProps} />
  );
};
