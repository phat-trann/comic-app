import { useRoutes } from 'react-router-dom';
import MainLayout from '~/layouts/Main';
import { Chapters, ComicDetail, Home } from '~/pages';
import SingleComicLayout from '~/layouts/SingleComic';

const Routes = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: ':id',
          element: <SingleComicLayout />,
          children: [
            { path: '', element: <ComicDetail /> },
            {
              path: ':chap',
              element: <Chapters />,
            },
          ],
        },
      ],
    },
  ]);
};

export default Routes;
