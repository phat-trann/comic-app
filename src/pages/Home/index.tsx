import axios from 'axios';
import { useEffect, useState } from 'react';
import { comicDataType } from '../../common/types';
import ComicCover from '../../elements/ComicCover';

function Home() {
  const [comics, setComics] = useState<null[] | comicDataType[]>(new Array(48).fill(null));

  useEffect(() => {
    (async () => {
      const { data }: { data: { error: boolean; data: comicDataType[] } } = await axios.get(
        `${import.meta.env.VITE_HOST}/comic/search?limit=48`,
      );

      if (!data?.error) {
        setComics(data.data);
      }
    })();
  }, []);

  return (
    <div className="w-100">
      <div className="flex w-full flex-wrap">
        {comics.map((comic, index) => (
          <div key={comic?._id || index} className="w-1/12">
            <ComicCover comicData={comic} showNewest={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
