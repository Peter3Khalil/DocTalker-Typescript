import React, { useState } from 'react';
import Logo from '@/components/shared/Logo';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { AiOutlineLoading3Quarters } from '@/components/shared/Icons';
import { cn } from '@/utils/helperFunctions';
import { useRouter } from 'next/router';
import formFields from '../../../public/formFields';
import InputField, { PasswordField } from '@/components/InputField';
import { useForm } from 'react-hook-form';
import { SignupSchema } from '@/utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import client from '@/utils/axios-util';

const Signup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data) => {
      return client.post('/user/signup', data);
    },
  });
  const { isLoading } = mutation;
  const [error, setError] = useState<any>(null);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: 'onTouched',
  });
  const { errors, isValid } = formState;
  const onSubmit = async (data) => {
    try {
      const res = await mutation.mutateAsync(data);
      if (res.token) {
        router.push('/');
        localStorage.setItem('token', res.token);
        return;
      }
      console.log(res);
      setError(res);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <main className="flex h-full w-full items-center justify-center px-6">
      <div className="flex w-[400px] flex-col items-center gap-4 rounded p-2 ">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold">
            Welcome to <Logo />
          </h1>
          <p className="text-gray-600">Please signup to continue</p>
        </div>
        {error && <p className="text-md text-red-500">{error.error||error.messasge}</p>}
        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {formFields.map((field) => {
            if (field.type === 'password')
              return (
                <PasswordField
                  register={register}
                  label={field.label}
                  name={field.name}
                  errorMsg={errors[field.name as keyof typeof errors]?.message}
                  id={field.id}
                  placeholder={field.placeholder}
                  key={field.id}
                />
              );
            return (
              <InputField
                register={register}
                label={field.label}
                name={field.name}
                errorMsg={errors[field.name as keyof typeof errors]?.message}
                id={field.id}
                placeholder={field.placeholder}
                key={field.id}
              />
            );
          })}
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
          </Button>
        </form>

        <Link href={'/auth/login'}>
          <p className="text-md text-primary">
            Already have an account? <span className="font-bold">Login</span>
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Signup;
