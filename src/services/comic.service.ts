import { chapterDetailType, comicDataType } from '~/common/types';
import api from './api';

const searchComic = async (paramSearch: {
  [key: string]: string | number;
}): Promise<{ data: comicDataType[]; error: boolean }> => {
  const res = await api.get('/comic/search', {
    params: {
      ...paramSearch,
    },
  });

  return res.data;
};

const getNewUploadComic = (limit: number, skip: number = 0) => {
  return searchComic({ limit, sort: 'lastUpload', sortType: 'desc', skip });
};

const getMostViewedComics = (limit: number) => {
  return searchComic({ limit, sort: 'views', sortType: 'desc' });
};
const getComicDetail = async (id: string): Promise<{ data: comicDataType; error: boolean }> => {
  const res = await api.get(`/comic/get/${id}`);

  return res.data;
};

const getChapterDetail = async (
  id: string,
  chap: string,
): Promise<{ data: chapterDetailType; error: boolean }> => {
  const res = await api.get(`/comic/${id}/${chap}`);

  return res.data;
};

const getComicsCount = async (): Promise<{ data: number; error: boolean }> => {
  const res = await api.get('/comic/count');

  return res.data;
};

export { getNewUploadComic, getMostViewedComics, getComicDetail, getChapterDetail, getComicsCount };
