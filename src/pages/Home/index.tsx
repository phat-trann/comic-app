import { useCallback, useContext, useMemo } from 'react';
import { AppContext } from '~/context/AppContext';
import Carousel from '~/components/AutoCarousel';
import ComicCover from '~/components/ComicCover';
import { useCallApiOnce, useWindowSize } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { Star, Fire } from '~/icons';
import Pagination from '~/components/Pagination';

const Home = () => {
  const {
    comics: currentComics,
    mostViewedComics,
    fetchRecentlyData,
    fetchMostViewedData,
    loadPage,
    allComicsCount,
    comicsInPage,
    currentPage,
    loading,
  } = useContext(AppContext);
  const { t } = useTranslation();

  const { loading: loadingMostViewed } = useCallApiOnce(async () => {
    await fetchMostViewedData(30);
  }, [mostViewedComics]);

  const { loading: loadingRecently } = useCallApiOnce(async () => {
    await fetchRecentlyData(24);
  }, [currentComics]);

  const comics = useMemo(() => {
    if (loading || loadingRecently || currentComics.length === 0) return new Array(24).fill(null);
    return currentComics;
  }, [loading, loadingRecently, currentComics]);

  const [windowSize, breakPoint, config] = useWindowSize();

  const handleChangePage = useCallback(
    async (page: number, pageSize: number) => {
      window.scrollTo(0, 0);
      await loadPage(page, pageSize);
    },
    [comicsInPage],
  );

  return (
    <div className="w-100 pt-4 pb-14 lg:pt-6">
      <div>
        <div className="px-2 font-bold sm:px-3 lg:px-8">
          <h1 className="flex items-center text-amber-500">
            <Star />
            <span className="ml-1">{t('title.most_viewed')}</span>
          </h1>
        </div>
        <div className="max-w-screen-lg p-1 sm:p-2 lg:px-5">
          {loadingMostViewed ? (
            <div className="flex">
              {new Array(breakPoint <= config.md ? breakPoint + 3 : config.md + 3)
                .fill(null)
                .map((item, index) => (
                  <div key={index} className="w-1/3 sm:w-1/4 md:w-1/5">
                    <div className="w-full p-1 lg:p-0 lg:px-3">
                      <ComicCover comicData={item} imageClass="h-52 lg:h-60" titleClass="" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Carousel
              dataList={mostViewedComics}
              autoScroll={true}
              render={([comic, index, defaultClass, scrollPosition]) => (
                <div key={comic?._id || index} className={defaultClass + 'w-1/3 sm:w-1/4 md:w-1/5'}>
                  <div className="w-full p-1 lg:p-0 lg:px-3">
                    <ComicCover
                      comicData={comic}
                      imageClass="h-52 lg:h-60"
                      titleClass=""
                      scrollPosition={scrollPosition}
                    />
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </div>
      <div className="pt-4">
        <div className="px-2 font-bold sm:px-3 lg:px-8">
          <h1 className="flex items-center text-red-500">
            <span className="mr-1">
              <Fire />
            </span>
            <span>{t('title.recently')}</span>
          </h1>
        </div>
        <div className="flex w-full max-w-screen-lg flex-wrap lg:px-5">
          {comics.map((comic, index) => (
            <div key={comic?._id || index} className="w-1/2 sm:w-1/3 md:w-1/4">
              <div className="w-full p-2 sm:p-3">
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
        {!loading && !loadingRecently && currentPage && allComicsCount && comicsInPage && (
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
};

export default Home;
