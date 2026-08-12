import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {!isHomePage && <Navbar />}
      <main className={`flex-1 w-full ${isHomePage ? 'p-0' : 'w-[94vw] max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
