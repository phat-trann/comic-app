import { useRoutes } from 'react-router-dom';
import Layout from '~/layouts';
import { Chapters, ComicDetail, Home } from '~/pages';

const Routes = () => {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/:id',
          element: <ComicDetail />
        },
        {
          path: '/:id/:chap',
          element: <Chapters />,
        },
      ],
    },
  ]);
};

export default Routes;
