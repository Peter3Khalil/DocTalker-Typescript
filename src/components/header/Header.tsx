'use client';
import React, { FC, memo } from 'react';
import { CgProfile } from '../shared/Icons';
import 'tippy.js/dist/tippy.css';
import Logo from '../shared/Logo';
import ThemeSwitcher from './ThemeSwitcher';
import ViewDocument from './ViewDocument';
import MenuComponent from './MenuComponent';
import { useRouter } from 'next/router';
type HeaderProps = {
  isChatPage?: boolean;
};

const Header: FC<HeaderProps> = ({ isChatPage }) => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };
  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b px-4 dark:border-foreground/20">
      <div className="flex items-center gap-2">
        <MenuComponent />
        <h1 className="text-xl">
          <Logo />
        </h1>
      </div>
      <div className="relative flex items-center gap-3">
        {isChatPage && <ViewDocument />}
        <ThemeSwitcher />
        <button className="relative text-2xl  md:hidden" title="Profile">
          <CgProfile />
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default memo(Header);
