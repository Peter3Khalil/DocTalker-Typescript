import React, { FC, memo, useState } from 'react';
import { cn } from '../utils/helperFunctions';
import { IoEyeOff, IoEyeSharp } from '../components/shared/Icons';

type InputFieldProps = {
  type?: string;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  children?: React.ReactNode;
  errorMsg?: string;
  validator?: any;
};

const InputField: FC<InputFieldProps> = ({
  type = 'text',
  label,
  name,
  id,
  placeholder,
  register,
  children,
  errorMsg,
  validator,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label
        htmlFor={id}
        className="block w-full cursor-pointer text-md capitalize text-foreground/70"
      >
        {label}
      </label>
      <div className="relative flex w-full flex-col">
        <div className="relative w-full">
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={cn(
              'w-full rounded border-2 p-2 text-md  outline-none focus:ring-1 focus:ring-primary',
              {
                'pr-10': type === 'password',
                'border-destructive focus:ring-destructive': !!errorMsg,
              },
            )}
            {...register(name, validator)}
            {...props}
          />
          {children}
        </div>
        {errorMsg && (
          <p className="mt-1 text-sm font-semibold text-destructive">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export const PasswordField: FC<InputFieldProps> = ({
  type = 'password',
  label,
  name,
  id,
  placeholder,
  register,
  errorMsg,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <InputField
      type={showPassword ? 'text' : type}
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      errorMsg={errorMsg}
      register={register}
      {...props}
    >
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
      >
        {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
      </button>
    </InputField>
  );
};
export default memo(InputField);
