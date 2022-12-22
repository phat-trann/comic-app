import { useRoutes } from 'react-router-dom';
import MainLayout from '~/layouts/Main';
import {
  Chapters,
  ComicDetail,
  Home,
  Follow,
  Search,
  Activity,
  Setting,
  Notice,
  Language,
  User,
} from '~/pages';
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
          path: '/follow',
          element: <Follow />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        {
          path: '/activity',
          element: <Activity />,
        },
        {
          path: '/setting',
          element: <Setting />,
        },
        {
          path: '/notice',
          element: <Notice />,
        },
        {
          path: '/language',
          element: <Language />,
        },
        {
          path: '/user',
          element: <User />,
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
