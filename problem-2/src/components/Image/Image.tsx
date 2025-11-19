import type { FC, ImgHTMLAttributes, SyntheticEvent } from 'react';

export type AppImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackUrl?: string;
};

export const AppImage: FC<AppImageProps> = ({
  fallbackUrl = '/token-fallback.svg',
  ...restProps
}) => {
  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    // This logic is used to prevent infinite loop when fallbackUrl also is error
    if (target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    }
  };

  return <img {...restProps} onError={handleError} />;
};
