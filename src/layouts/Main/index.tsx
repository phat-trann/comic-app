import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/Header';
import AppContextProvider from '~/context/AppContext';

const MainLayout = () => {
  return (
    <AppContextProvider>
      <>
        <Header />
        <Outlet />
      </>
    </AppContextProvider>
  );
};

export default MainLayout;
