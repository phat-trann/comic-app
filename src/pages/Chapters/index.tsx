import { useContext, useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import { changeWidthImageUrl } from '~/common/helpers/formatData';
import ImageSkeleton from '~/components/ImageSkeleton';
import { useWindowSize } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getChapterDetail } from '~/services/comic.service';

const Chapters = () => {
  const { id, chap } = useParams();
  const { t } = useTranslation();
  const [{ height }] = useWindowSize();
  const [showFirstLoading, setShowFirstLoading] = useState(true);

  const { data: currentChapter } = useQuery({
    queryKey: ['chapter', id, chap],
    queryFn: async () => await getChapterDetail(id || '', chap || ''),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const images = useMemo(() => currentChapter?.data?.images, [currentChapter?.data]);

  if (currentChapter?.error) return <p>{t('common.error')}</p>;

  return (
    <>
      {!images?.length ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="flex flex-col flex-wrap items-center">
            <div className="w-96">
              {showFirstLoading && <ImageSkeleton className="h-screen w-full" />}
              {images.map((el: any, index: any) => (
                <div
                  key={el._id + String(index)}
                  className="flex [&>.lazy-load-image-loaded]:!h-fit"
                >
                  <LazyLoadImage
                    src={changeWidthImageUrl(el, 384)}
                    placeholder={<img src={changeWidthImageUrl(el, 10)} className="w-full" />}
                    width={384}
                    height={height}
                    threshold={height}
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
