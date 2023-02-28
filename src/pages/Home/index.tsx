import { useCallback, useState } from 'react';
import Carousel from '~/components/AutoCarousel';
import ComicCover from '~/components/ComicCover';
import { useCacheParams, useWindowSize } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { Star, Fire } from '~/icons';
import Pagination from '~/components/Pagination';
import { useQueries } from '@tanstack/react-query';
import { getComicsCount, getMostViewedComics, getNewUploadComic } from '~/services/comic.service';

const Home = () => {
  const { t } = useTranslation();
  const comicsInPage = 24;
  const [params, setSearchParams] = useCacheParams();
  const [currentPage, setCurrentPage] = useState(
    params('currentPage') ? Number(params('currentPage')) : 1,
  );
  const [{ data: allComicsCount }, { data: mostViewComics }, { data: comics }] = useQueries({
    queries: [
      {
        queryKey: ['home', 'count'],
        queryFn: async () => await getComicsCount(),
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['home', 'most-viewed'],
        queryFn: async () => getMostViewedComics(30),
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['home', 'current-comic', currentPage],
        queryFn: async () => getNewUploadComic(comicsInPage, currentPage),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const [windowSize, breakPoint, config] = useWindowSize();

  const handleChangePage = useCallback(async (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  }, []);

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
          {!mostViewComics?.data ? (
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
              dataList={mostViewComics?.data}
              autoScroll={true}
              render={([comic, index, defaultClass, scrollPosition]) => (
                <div key={comic?._id || index} className={defaultClass + 'w-1/3 sm:w-1/4 md:w-1/5'}>
                  <div className="w-full p-1 lg:p-0 lg:px-3">
                    <ComicCover
                      comicData={comic}
                      imageClass="h-52 lg:h-60"
                      titleClass=""
                      scrollPosition={scrollPosition}
                      beforeLeave={() => {
                        setSearchParams({
                          currentPage,
                        });
                      }}
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
          {comics?.data
            ? comics.data.map((comic, index) => (
                <div key={comic?._id || index} className="w-1/2 sm:w-1/3 md:w-1/4">
                  <div className="w-full p-2 sm:p-3">
                    <ComicCover
                      comicData={comic}
                      showNewest={true}
                      imageClass="h-60"
                      titleClass="h-28"
                      beforeLeave={() => {
                        setSearchParams({
                          currentPage,
                        });
                      }}
                    />
                  </div>
                </div>
              ))
            : new Array(comicsInPage).fill(null).map((comic, index) => (
                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4">
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
        {currentPage && allComicsCount?.data && comicsInPage && (
          <Pagination
            defaultCurrent={currentPage}
            total={allComicsCount?.data}
            defaultPageSize={comicsInPage}
            onChange={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
