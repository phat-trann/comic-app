import React from 'react';
import { Outlet } from 'react-router-dom';
import ComicContextProvider from '~/context/ComicContext';

const SingleComicLayout = () => {
  return (
    <ComicContextProvider>
      <Outlet />
    </ComicContextProvider>
  );
};

export default SingleComicLayout;
