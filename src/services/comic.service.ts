import { AxiosResponse } from 'axios';
import { comicDataType } from '~/common/types';
import api from './api';

const getABCComic = async (
  limit: number,
): Promise<AxiosResponse<{ error: boolean; data: comicDataType[] }, null>> => {
  return await api.get(`/comic/search`, {
    params: {
      limit,
    },
  });
};

const getMostViewedComics = async (
  limit: number,
): Promise<AxiosResponse<{ error: boolean; data: comicDataType[] }, null>> => {
  return await api.get(`/comic/search`, {
    params: {
      limit,
      sort: 'views',
      sortType: 'desc',
    },
  });
};

export default {
  getABCComic,
  getMostViewedComics,
};
