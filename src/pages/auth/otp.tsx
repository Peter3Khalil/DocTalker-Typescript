import InputField from '@/components/InputField';
import Button from '@/components/shared/Button';
import { cn } from '@/utils/helperFunctions';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Otp = () => {
  const { register, handleSubmit, formState } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { errors, isValid } = formState;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[400px] flex-col items-center gap-4">
        <h1>Verify Email</h1>
        <InputField
          id="1"
          label="Code"
          name="otp"
          placeholder="Code"
          register={register}
          validator={{ required: 'Code is required' }}
        />
        <Button
          type="submit"
          className={cn('w-full', {
            'cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground':
              !isValid || isLoading,
          })}
          disabled={!isValid}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            'Signup'
          )}
        </Button>{' '}
      </div>
    </div>
  );
};

export default Otp;
