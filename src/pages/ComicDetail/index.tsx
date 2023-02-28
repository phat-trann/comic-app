import { Link, useParams } from 'react-router-dom';
import {
  changeWidthImageUrl,
  diffDate,
  formatRating,
  formatView,
} from '~/common/helpers/formatData';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getComicDetail } from '~/services/comic.service';

const ComicDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: currentComic } = useQuery({
    queryKey: ['comic', id],
    queryFn: async () => await getComicDetail(id || ''),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  if (currentComic?.error) return <div>{t('common.error')}</div>;

  return (
    <div className="">
      {!currentComic?.data ? (
        <p>Loading</p>
      ) : (
        <div className="">
          <div>
            <img src={changeWidthImageUrl(currentComic.data.avatar, 500)} className="" />
            <p className="">Name: {currentComic.data.name}</p>
            <p className="">Another name: {currentComic.data.anotherName.join(', ')}</p>
            <p className="">Artists: {currentComic.data.artists.join(', ')}</p>
            <p className="">Authors: {currentComic.data.authors.join(', ')}</p>
            <p className="">Description: {currentComic.data.description}</p>
            <p className="">
              <span>Category: </span>
              {currentComic.data.category.map((el: any) => (
                <Link to={`/category/${el.key}`} key={el.key}>
                  {el.name},{' '}
                </Link>
              ))}
            </p>
            <p className="">Status: {currentComic.data.isDone ? 'Done' : 'In Progress'}</p>
            <p className="">
              Rates: {formatRating(currentComic.data.voteSum, currentComic.data.voteCount)}
            </p>
            <p className="">Views: {formatView(currentComic.data.views)}</p>
            <p className="">Followers: {currentComic.data.followers}</p>
            <p className="">Chapters: {currentComic.data.chapters.length}</p>
            {currentComic.data.chapters.map((ell: any, index: number) => (
              <div key={ell._id + String(index)}>
                <Link to={`/${ell.hashName}`} className="">
                  {ell.name} - {formatView(ell.views)} - {diffDate(ell.updateDate, Date.now())}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicDetail;
