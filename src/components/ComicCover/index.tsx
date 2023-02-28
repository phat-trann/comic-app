import React from 'react';
import { Link } from 'react-router-dom';
import { changeWidthImageUrl, diffDate, formatView } from '~/common/helpers/formatData';
import { comicDataType, chapterType } from '~/common/types';
import Views from '~/icons/Views';
import ImageSkeleton from '../ImageSkeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';

const TitleInside: React.FC<{ className: string; name?: string }> = ({ className, name }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`absolute bottom-0 h-7 w-full overflow-hidden rounded-b-lg bg-gradient-to-b from-transparent to-gray-900 text-white ${className}`}
    >
      <p className="w-full px-1 text-center line-clamp-1">{name || t('common.loading')}</p>
    </div>
  );
};

const TitleOutside: React.FC<{ className: string; lastChapter?: chapterType; name?: string }> = ({
  className,
  lastChapter,
  name,
}) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <div className="pt-1 text-xs font-bold">
        <div className="flex">
          <div className="w-5/12">{lastChapter?.name || t('common.loading')}</div>
          <div className="w-7/12">
            <div className="flex flex-nowrap items-center justify-end">
              {formatView(lastChapter?.views || 0, true)}
              <div className="overflow-hidden">
                <Views className="m-0 w-4 pl-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">{diffDate(lastChapter?.updateDate || Date.now(), Date.now())}</div>
      </div>
      <div className="pt-2 text-sm font-bold">
        <div className="line-clamp-3">{name || t('common.loading')}</div>
      </div>
    </div>
  );
};

const ComicCover: React.FC<{
  imageClass: string;
  titleClass: string;
  avatarSize?: number;
  comicData: comicDataType | null;
  showNewest?: boolean;
}> = ({ imageClass, titleClass, comicData, avatarSize, showNewest = false }) => {
  const lastChapter = comicData?.chapters[comicData.chapters.length - 1];

  return (
    <div className="overflow-hidden rounded-lg">
      {comicData ? (
        <Link to={`/${comicData?.hashName || ''}`}>
          <div
            className={`relative flex items-center justify-center overflow-hidden ${imageClass}`}
          >
            <LazyLoadImage
              alt={comicData?.name}
              src={changeWidthImageUrl(comicData.avatar, avatarSize || 400)}
              placeholder={
                <img
                  src={changeWidthImageUrl(comicData.avatar, 10)}
                  className="h-full w-full object-cover"
                />
              }
              threshold={500}
              className="h-full w-full object-cover"
            />
            {!showNewest && <TitleInside name={comicData?.name} className={titleClass} />}
          </div>
        </Link>
      ) : (
        <>
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-lg ${imageClass}`}
          >
            <ImageSkeleton className="h-full w-full overflow-hidden rounded-lg" />
            {!showNewest && <TitleInside className={titleClass} />}
          </div>
        </>
      )}
      {showNewest && (
        <Link to={`/${lastChapter?.hashName || ''}`}>
          <TitleOutside lastChapter={lastChapter} name={comicData?.name} className={titleClass} />
        </Link>
      )}
    </div>
  );
};

export default ComicCover;
