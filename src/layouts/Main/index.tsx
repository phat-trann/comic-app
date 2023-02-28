import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import BackToTop from '~/components/BackToTop';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <BackToTop />
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MainLayout;
