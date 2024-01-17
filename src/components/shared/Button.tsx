import React, { FC } from 'react';
import { cn } from '../../utils/helperFunctions';
import type { AppProps } from 'next/app';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  props?: AppProps;
};
const Button: FC<ButtonProps> = ({
  children,
  className = '',
  disabled = false,
  type = 'button',
  props,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={cn(
        'flex w-full items-center justify-center  rounded bg-primary  p-2 text-primary-foreground outline-none hover:bg-primary/90 ',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
