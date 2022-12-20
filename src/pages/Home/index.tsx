import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import Carousel from '~/components/AutoCarousel';
import ComicCover from '~/components/ComicCover';
import { useCallApiOnce } from '~/hooks';
import { useTranslation } from 'react-i18next';

function Home() {
  const { comics, mostViewedComics, fetchData } = useContext(AppContext);
  const { t } = useTranslation();

  useCallApiOnce(async () => await fetchData(), [comics, mostViewedComics]);

  return (
    <div className="w-100 pt-20">
      <div>
        <div className="px-2 font-bold">
          <h3>{t('title.most_viewed')}</h3>
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
          <h3>{t('title.recently')}</h3>
        </div>
        <div className="flex w-full flex-wrap">
          {comics.map((comic, index) => (
            <div key={comic?._id || index} className="w-1/2">
              <div className="w-full p-2">
                <ComicCover
                  comicData={comic}
                  showNewest={true}
                  imageClass="h-60"
                  titleClass="h-20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
