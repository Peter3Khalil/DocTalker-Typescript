import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Uploader from '@/components/Uploader';
import Logo from '@/components/shared/Logo';
import React from 'react';
console.log('Home');
const Home = () => {
  return <DashboardLayout isChatPage={false}>
     <main className="flex h-full flex-1 items-center justify-center px-4 lg:p-0">
        <div className=" relative flex flex-col items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to <Logo />
          </h1>
          <Uploader />
        </div>
      </main>
  </DashboardLayout>;
};

export default Home;
