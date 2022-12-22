import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import AppContextProvider from '~/context/AppContext';
import BackToTop from '~/components/BackToTop';

const MainLayout = () => {
  return (
    <AppContextProvider>
      <>
        <Header />
        <Outlet />
        <BackToTop />
        <Footer />
      </>
    </AppContextProvider>
  );
};

export default MainLayout;
