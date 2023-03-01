import { Link, useParams } from 'react-router-dom';
import { changeWidthImageUrl, formatRating, formatView } from '~/common/helpers/formatData';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getComicDetail } from '~/services/comic.service';
import ImageSkeleton from '~/components/ImageSkeleton';
import { Rate } from 'antd';
import { useCacheParams } from '~/hooks';
import ColumnTable from './ComicTable';
import { useMemo } from 'react';

const ComicDetail = () => {
  const { id } = useParams();
  const [searchParams] = useCacheParams();
  const firstLoad = searchParams('firstLoad');
  const { t } = useTranslation();
  const { data: currentComic } = useQuery({
    queryKey: ['comic', id],
    queryFn: async () => await getComicDetail(id || ''),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const chapters = useMemo(() => {
    if (!currentComic?.data?.chapters) return [];
    return [...currentComic.data.chapters].reverse();
  }, [currentComic?.data?.chapters]);

  if (firstLoad) {
    window.scrollTo(0, 0);
  }

  if (currentComic?.error) return <div>{t('common.error')}</div>;

  return (
    <div className="">
      {
        <div className="flex w-full flex-wrap overflow-hidden p-3">
          <div className="mb-2 w-full text-xl font-bold">
            {currentComic?.data?.name || t('common.loading')}
          </div>
          <div className="relative mb-2 h-[500px] w-full">
            {currentComic?.data?.avatar && (
              <img
                src={changeWidthImageUrl(currentComic.data.avatar, 500)}
                className="absolute z-10 h-full w-full rounded-lg object-cover"
              />
            )}
            <ImageSkeleton className="absolute z-0 h-full w-full overflow-hidden rounded-lg" />
          </div>
          <div className="w-full">
            <div className="mb-7">
              <div className="font-bold">
                {currentComic?.data?.anotherName.join(', ') || t('common.loading')}
              </div>
              <div className="mt-2 flex">
                Artists: <p className="ml-1 font-bold">{currentComic?.data?.artists.join(', ')}</p>
              </div>
              <div className="flex">
                Authors: <p className="ml-1 font-bold">{currentComic?.data?.authors.join(', ')}</p>
              </div>
              <div className="font-bold">
                <span className="font-normal">Category: </span>
                {currentComic?.data?.category.map((el: any, index: number, array) => (
                  <Link to={`/category/${el.key}`} key={el.key} className="text-blue-500">
                    {el.name}
                    {index < array.length - 1 && ', '}
                  </Link>
                ))}
              </div>
              <div className="flex">
                Status:
                <p className="ml-1 font-bold">
                  {currentComic?.data?.isDone ? 'Done' : 'In Progress'}
                </p>
              </div>
              <div className="">
                <Rate
                  allowHalf
                  value={
                    formatRating(
                      currentComic?.data?.voteSum || 0,
                      currentComic?.data?.voteCount || 0,
                    ) || 0
                  }
                />
              </div>
              <div className="flex">
                Views:
                <p className="ml-1 font-bold">{formatView(currentComic?.data?.views || 0)}</p>
              </div>
              <div className="my-4">
                <div className="my-2">
                  <button className="btn-secondary btn w-full">Read</button>
                </div>
                <div className="my-2">
                  <button className="btn-primary btn w-full">
                    Follow - {currentComic?.data?.followers}
                  </button>
                </div>
              </div>
              <div className="mt-3 flex w-full flex-wrap">
                <p className="mb-1 font-bold">Description:</p>
                <div>{currentComic?.data?.description}</div>
              </div>
              <div className="mx-5 border-b-2 pt-10"></div>
            </div>
            <div>
              <p className="mb-1 font-bold">Chapters:</p>
              <ColumnTable data={chapters} />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ComicDetail;
