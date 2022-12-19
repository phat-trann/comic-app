import { useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { ERROR_TEXT } from '~/common/constants';
import { changeWidthImageUrl, diffDate, formatView } from '~/common/helpers/formatData';
import { useCallApiOnce, useWindowSize } from '~/hooks';
import comicService from '~/services/comic.service';

const Chapters = () => {
  const { id, chap } = useParams();
  const [{ height: windowHeight }] = useWindowSize();
  const [height, setHeight] = useState<number | string>(windowHeight);
  const { data, loading, error } = useCallApiOnce(
    async () => await comicService.getChapterDetail(id || '', chap || ''),
  );
  const images = useMemo(() => data?.data?.images, [data]);

  if (error?.error || data?.error) return <p>{error?.message || ERROR_TEXT}</p>;

  return (
    <>
      {loading || !data || !images?.length ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            {data.data.name} - {formatView(data.data.views)} -{' '}
            {diffDate(data.data.updateDate, Date.now())}
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
