import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import AppContextProvider from '~/context/AppContext';
import BackToTop from '~/components/BackToTop';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const MainLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <div className="dark:bg-slate-900">
          <Header />
          <Outlet />
          <BackToTop />
          <Footer />
        </div>
      </AppContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MainLayout;
