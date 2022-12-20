import { useContext, useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { ERROR_TEXT } from '~/common/constants';
import { changeWidthImageUrl, diffDate, formatView } from '~/common/helpers/formatData';
import ImageSkeleton from '~/components/ImageSkeleton';
import { ComicContext } from '~/context/ComicContext';
import { useCallApiOnce, useWindowSize } from '~/hooks';

const Chapters = () => {
  let { id, chap } = useParams();
  if (!id) id = '';
  if (!chap) chap = '';
  const [{ height }] = useWindowSize();
  const [showFirstLoading, setShowFirstLoading] = useState(true);
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
          <div className="flex flex-col flex-wrap items-center">
            <div className="w-96">
              {showFirstLoading && <ImageSkeleton className="h-screen w-full" />}
              {images.map((el: any, index: any) => (
                <div key={el._id} className="flex [&>.lazy-load-image-loaded]:!h-fit">
                  <LazyLoadImage
                    src={changeWidthImageUrl(el, 384)}
                    placeholder={<img src={changeWidthImageUrl(el, 10)} className="w-full" />}
                    width={384}
                    height={height}
                    threshold={100}
                    className="w-full"
                    wrapperClassName="h-fit w-full"
                    afterLoad={() => {
                      if (index === 0) {
                        setShowFirstLoading(false);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chapters;
