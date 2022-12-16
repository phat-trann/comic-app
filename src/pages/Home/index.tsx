import { useEffect, useState } from 'react';
import { comicDataType } from '~/common/types';
import Carousel from '~/elements/AutoCarousel';
import ComicCover from '~/elements/ComicCover';
import comicService from '~/services/comic.service';

function Home() {
  const [comics, setComics] = useState<comicDataType[] | null[]>(new Array(48).fill(null));
  const [mostViewedComic, setMostViewedComic] = useState<comicDataType[] | null[]>(
    new Array(10).fill(null),
  );

  useEffect(() => {
    (async () => {
      const { data: mostViewedData } = await comicService.getMostViewedComic(30);
      const { data: abcData } = await comicService.getABCComic(48);

      if (!mostViewedData.error) setMostViewedComic(mostViewedData.data);
      if (!abcData.error) setComics(abcData.data);
    })();
  }, []);

  return (
    <div className="w-100">
      <Carousel
        id="most-viewed"
        dataList={mostViewedComic}
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
