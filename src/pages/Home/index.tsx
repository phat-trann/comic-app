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
      <Carousel
        dataList={mostViewedComics}
        autoScroll={true}
        render={([comic, index, defaultClass]) => (
          <div key={comic?._id || index} className={defaultClass + 'w-1/2 md:w-1/12'}>
            <ComicCover comicData={comic} />
          </div>
        )}
      />
      <div className="flex w-full flex-wrap">
        {comics.map((comic, index) => (
          <div key={comic?._id || index} className="w-1/2 md:w-1/12">
            <ComicCover comicData={comic} showNewest={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
