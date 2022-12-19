import { URLs } from '~/common/constants';
import { comicDataType } from '~/common/types';
import api from './api';

const searchComic = async (paramSearch: {
  [key: string]: string | number;
}): Promise<{ data: comicDataType[]; error: boolean }> => {
  const res = await api.get(URLs.SEARCH, {
    params: {
      ...paramSearch,
    },
  });

  return res.data;
};

const getABCComic = (limit: number) => {
  return searchComic({ limit });
};

const getMostViewedComics = (limit: number) => {
  return searchComic({ limit, sort: 'views', sortType: 'desc' });
};

export default {
  getABCComic,
  getMostViewedComics,
};
