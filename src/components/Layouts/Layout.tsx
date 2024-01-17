'use client';
import { RootState } from '@/redux/store';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { mode } = useSelector((state: RootState) => state.theme);
  return (
    <div className={mode} id="mainContainer">
      {children}
    </div>
  );
};

export default Layout;
