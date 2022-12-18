import { useContext } from 'react';
import { context } from '~/context/ComicList';
import Carousel from '~/elements/AutoCarousel';
import ComicCover from '~/elements/ComicCover';

function Home() {
  const { comics, mostViewedComic } = useContext(context);

  return (
    <div className="w-100">
      <Carousel
        id="most-viewed"
        dataList={mostViewedComic}
        autoScroll={true}
        render={([comic, index, elementId, defaultClass]) => (
          <div
            key={comic?._id || index}
            id={elementId}
            className={defaultClass + 'w-1/2 md:w-1/12'}
          >
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
