import { useContext, useEffect } from 'react';
import { AppContext } from '~/context/AppContext';
import Carousel from '~/elements/AutoCarousel';
import ComicCover from '~/elements/ComicCover';

function Home() {
  const { comics, mostViewedComics, fetchData } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <div className="w-100">
      <Carousel
        dataList={mostViewedComics}
        autoScroll={true}
        render={([comic, index, defaultClass, customKey]) => (
          <div key={customKey || comic?._id || index} className={defaultClass + 'w-1/2 md:w-1/12'}>
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
