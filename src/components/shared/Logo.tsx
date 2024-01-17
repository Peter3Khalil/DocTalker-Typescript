import { cn } from '@/utils/helperFunctions';
import React, { FC } from 'react';
type LogoProps = React.HTMLAttributes<HTMLSpanElement>;
const Logo: FC<LogoProps> = (props) => {
  return (
    <span {...props} className="font-bold">
      <Doc className="mr-1" />
      Talker
    </span>
  );
};

type DocProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};
export const Doc: FC<DocProps> = ({ className }) => {
  return (
    <span
      className={cn(
        'rounded bg-primary p-1 font-bold text-primary-foreground',
        className,
      )}
    >
      Doc
    </span>
  );
};
export default Logo;
