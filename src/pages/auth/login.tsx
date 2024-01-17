import InputField, { PasswordField } from '@/components/InputField';
import Button from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import { cn } from '@/utils/helperFunctions';
import { LoginSchema } from '@/utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const loginUser = async (user) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { data } = await axios.post(`${baseUrl}/user/login`, user);
  return data;
}

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onTouched',
  });

  const { errors, isValid } = formState;
  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    setIsSuccess(false);
    try {
      const res = await loginUser(data);
      setIsLoading(false);
      setIsSuccess(true);
      localStorage.setItem('token', res.token);
      setTimeout(() => {
        router.push('/');
      }, 1000);
      console.log(res);
    } catch (error) {
      setServerError("Invalid Credentials");
      console.log(error);
      setIsLoading(false);
    } finally{
      setIsLoading(false);
    }
  };
  return (
    <main className="flex h-full w-full items-center justify-center px-6">
      <div className="flex w-[400px] flex-col items-center gap-4 rounded p-2 ">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold">
            Welcome to <Logo />
          </h1>
          <p className="text-gray-600">Please Login to continue</p>
        </div>
        {serverError && <p className="text-md text-red-500">{serverError}</p>}
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
              "Login"
            )}
          </Button>
        </form>

        <Link href={'/auth/signup'}>
          <p className="text-md text-primary">
           Create new account: <span className="font-bold">Signup</span>
          </p>
        </Link>
      </div>

      {isSuccess && (
        <div className="fixed z-10 flex h-full w-full items-center justify-center bg-muted opacity-50">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
        </div>
      )}
    </main>
  );
};

export default Login;
