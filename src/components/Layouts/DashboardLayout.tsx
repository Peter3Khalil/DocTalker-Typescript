'use client';
import React, { FC } from 'react';
import Sidebar from '../sidebar/Sidebar';
// import Modal from '../Modal';
import ProtectedRoutes from '../ProtectedRoutes';
import Header from '../header/Header';

type DashboardLayoutProps = {
  isChatPage?: boolean;
  children: React.ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  isChatPage = true,
  children,
}) => {
  return (
    <ProtectedRoutes>
      <div className={`flex h-full w-full `}>
        <Sidebar />
        <div className="flex h-full flex-1 flex-col gap-2 overflow-y-auto  bg-background">
          <Header isChatPage={isChatPage} />
          {children}
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default DashboardLayout;
