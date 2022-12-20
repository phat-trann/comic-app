import { URLs } from '~/common/constants';
import { chapterDetailType, comicDataType } from '~/common/types';
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

const getNewUploadComic = (limit: number) => {
  return searchComic({ limit, sort: 'lastUpload', sortType: 'desc' });
};

const getMostViewedComics = (limit: number) => {
  return searchComic({ limit, sort: 'views', sortType: 'desc' });
};
const getComicDetail = async (id: string): Promise<{ data: comicDataType; error: boolean }> => {
  const res = await api.get(`/comic/${id}`);

  return res.data;
};

const getChapterDetail = async (
  id: string,
  chap: string,
): Promise<{ data: chapterDetailType; error: boolean }> => {
  const res = await api.get(`/comic/${id}/${chap}`);

  return res.data;
};

export default {
  getNewUploadComic,
  getMostViewedComics,
  getComicDetail,
  getChapterDetail,
};
