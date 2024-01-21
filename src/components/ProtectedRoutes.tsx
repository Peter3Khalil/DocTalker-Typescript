import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
//TODO : check if user is authenticated

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      setIsAuth(false);
    } else {
      //TODO: verify token
      setIsAuth(true);
    }
  }, []);
  return <>{isAuth ? children : 'Redirecting...'}</>;
};

export default ProtectedRoutes;
