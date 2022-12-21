import { useCallback, useContext, useMemo, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import Carousel from '~/components/AutoCarousel';
import ComicCover from '~/components/ComicCover';
import { useCallApiOnce } from '~/hooks';
import { useTranslation } from 'react-i18next';
import Star from '~/icons/Star';
import Fire from '~/icons/Fire';
import Pagination from '~/components/Pagination';

function Home() {
  const {
    mostViewedComics: currentMostViewedComics,
    fetchRecentlyData,
    fetchMostViewedData,
    loadPage,
    comics: currentComics,
    allComicsCount,
    comicsInPage,
    currentPage,
    loading,
  } = useContext(AppContext);
  console.time('home');
  const { t } = useTranslation();
  const { loading: loadingRecently } = useCallApiOnce(async () => {
    await fetchRecentlyData(20);
  }, [currentComics]);
  const comics = useMemo(() => {
    if (loading || loadingRecently || currentComics.length === 0) return new Array(20).fill(null);
    return currentComics;
  }, [loading, loadingRecently, currentComics]);
  const mostViewedComics = useMemo(() => {
    if (currentMostViewedComics.length === 0) return new Array(3).fill(null);
    return currentMostViewedComics;
  }, [currentMostViewedComics]);

  useCallApiOnce(async () => {
    await fetchMostViewedData(30);
  }, [currentMostViewedComics]);

  const handleChangePage = useCallback(
    async (page: number, pageSize: number) => {
      window.scrollTo(0, 0);
      await loadPage(page, pageSize);
    },
    [comicsInPage],
  );

  return (
    <div className="w-100 pt-4 pb-14">
      <div>
        <div className="px-2 font-bold">
          <h1 className="flex items-center text-amber-500">
            <span className="mr-1">
              <Star />
            </span>
            <span>{t('title.most_viewed')}</span>
          </h1>
        </div>
        <div className="p-1">
          <Carousel
            dataList={mostViewedComics}
            autoScroll={true}
            render={([comic, index, defaultClass]) => (
              <div key={comic?._id || index} className={defaultClass + 'w-1/3'}>
                <div className="w-full p-1">
                  <ComicCover comicData={comic} imageClass="h-52" titleClass="" />
                </div>
              </div>
            )}
          />
        </div>
      </div>
      <div className="pt-4">
        <div className="px-2 font-bold">
          <h1 className="flex items-center text-red-500">
            <span className="mr-1">
              <Fire />
            </span>
            <span>{t('title.recently')}</span>
          </h1>
        </div>
        <div className="flex w-full flex-wrap">
          {comics.map((comic, index) => (
            <div key={comic?._id || index} className="w-1/2">
              <div className="w-full p-2">
                <ComicCover
                  comicData={comic}
                  showNewest={true}
                  imageClass="h-60"
                  titleClass="h-28"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center align-middle">
        {!loading && !loadingRecently && !!(currentPage && allComicsCount && comicsInPage) && (
          <Pagination
            defaultCurrent={currentPage}
            total={allComicsCount}
            defaultPageSize={comicsInPage}
            onChange={handleChangePage}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
