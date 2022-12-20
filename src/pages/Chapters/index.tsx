import { useContext, useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { ERROR_TEXT } from '~/common/constants';
import { changeWidthImageUrl, diffDate, formatView } from '~/common/helpers/formatData';
import { ComicContext } from '~/context/ComicContext';
import { useCallApiOnce, useWindowSize } from '~/hooks';

const Chapters = () => {
  let { id, chap } = useParams();
  if (!id) id = '';
  if (!chap) chap = '';
  const [{ height: windowHeight }] = useWindowSize();
  const [height, setHeight] = useState<number | string>(windowHeight);
  const { chapters, getChapter } = useContext(ComicContext);
  const { data, loading, error } = useCallApiOnce(
    async () => await getChapter(id, chap),
    [chapters[chap]],
  );
  const currentChapter = useMemo(() => chapters[chap as string], [chapters[chap]]);
  const images = useMemo(() => currentChapter?.images, [currentChapter]);

  if (error?.error || data?.error) return <p>{error?.message || ERROR_TEXT}</p>;

  return (
    <>
      {loading || !currentChapter || !images?.length ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            {currentChapter.name} - {formatView(currentChapter.views)} -{' '}
            {diffDate(currentChapter.updateDate, Date.now())}
          </div>
          <div className="flex flex-col flex-wrap items-center">
            {images.map((el: any, index: any) => (
              <LazyLoadImage
                src={changeWidthImageUrl(el, 500)}
                placeholder={<img src={changeWidthImageUrl(el, 10)} className="w-full" />}
                width={500}
                height={height}
                key={index}
                className="w-full"
                wrapperClassName="h-fit"
                afterLoad={() => {
                  if (index === 0) {
                    setHeight('fit-content');
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Chapters;
