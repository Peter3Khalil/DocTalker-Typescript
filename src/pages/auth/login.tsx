import InputField, { PasswordField } from '@/components/InputField';
import Button from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import client from '@/utils/axios-util';
import { cn } from '@/utils/helperFunctions';
import { LoginSchema } from '@/utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMutation } from 'react-query';

type LoginData = {
  email: string;
  password: string;
}
type User  ={
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<any>(null);
  const mutation = useMutation({
    mutationFn: (data:LoginData) => {
      return client.post('/user/login', data);
    },
  });
  const { isLoading } = mutation;
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onTouched',
  });

  const { errors, isValid } = formState;
  const onSubmit = async (data:LoginData) => {
    setError(null);
    try {
      const res = await mutation.mutateAsync(data);
      if (res.token) {
        router.push('/');
        localStorage.setItem('token', res.token);
        return;
      }
      setError('Invalid Credentials');
    } catch (error) {
      setError(error);
    }
  };
  return (
    <main className="flex h-full w-full items-center justify-center px-6">
      <div className="flex w-[400px] flex-col items-center gap-4 rounded p-2 ">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold">
            Welcome to <Link href={`/home`}><Logo /></Link> 
          </h1>
          <p className="text-gray-600">Please Login to continue</p>
        </div>
        {error && <p className="text-md text-red-500">{error}</p>}
        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <InputField
            id="1"
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            type="text"
            register={register}
            errorMsg={errors['email' as keyof typeof errors]?.message}
          />
          <PasswordField
            id="2"
            label="Password"
            name="password"
            placeholder="Enter Your Password"
            register={register}
            errorMsg={errors['password' as keyof typeof errors]?.message}
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
              'Login'
            )}
          </Button>
        </form>

        <Link href={'/auth/signup'}>
          <p className="text-md text-primary">
            Create new account: <span className="font-bold">Signup</span>
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
