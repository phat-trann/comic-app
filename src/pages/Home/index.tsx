import { useContext } from 'react';
import { AppContext } from '~/context/AppContext';
import Carousel from '~/components/AutoCarousel';
import ComicCover from '~/components/ComicCover';
import { useCallApiOnce } from '~/hooks';

function Home() {
  const { comics, mostViewedComics, fetchData } = useContext(AppContext);

  useCallApiOnce(async () => await fetchData(), [comics, mostViewedComics]);

  return (
    <div className="w-100">
      <div className="p-2">
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
      <div className="flex w-full flex-wrap">
        {comics.map((comic, index) => (
          <div key={comic?._id || index} className="w-1/2">
            <div className="w-full p-3">
              <ComicCover comicData={comic} showNewest={true} imageClass="h-60" titleClass="h-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
