import React from 'react';
import { Outlet } from 'react-router-dom';
import AppContextProvider from '~/context/AppContext';

const MainLayout = () => {
  return (
    <AppContextProvider>
      <Outlet />
    </AppContextProvider>
  );
};

export default MainLayout;
