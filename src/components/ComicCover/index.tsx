import React from 'react';
import { Link } from 'react-router-dom';
import { LOADING_TEXT } from '~/common/constants';
import { changeWidthImageUrl, diffDate, formatView } from '~/common/helpers/formatData';
import { comicDataType, chapterType } from '~/common/types';
import Views from '~/icons/Views';
import ImageSkeleton from '../ImageSkeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TitleInside: React.FC<{ className: string; name?: string }> = ({ className, name }) => (
  <div
    className={`absolute bottom-0 h-7 w-full bg-gradient-to-b from-transparent to-gray-900 text-white ${className}`}
  >
    <p className="w-full px-1 text-center line-clamp-1">{name || LOADING_TEXT}</p>
  </div>
);

const TitleOutside: React.FC<{ className: string; lastChapter?: chapterType; name?: string }> = ({
  className,
  lastChapter,
  name,
}) => (
  <div className={className}>
    <div className="pt-1 text-xs font-bold">
      <div className="flex">
        <div className="w-5/12">{lastChapter?.name || LOADING_TEXT}</div>
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
    <div className="pt-2 text-xs font-bold">
      <div className="line-clamp-2">{name || LOADING_TEXT}</div>
    </div>
  </div>
);

const ComicCover: React.FC<{
  imageClass: string;
  titleClass: string;
  comicData: comicDataType | null;
  showNewest?: boolean;
}> = ({ imageClass, titleClass, comicData, showNewest = false }) => {
  const lastChapter = comicData?.chapters[comicData.chapters.length - 1];

  return (
    <div className="overflow-hidden rounded-lg">
      <Link to={`/${comicData?.hashName || ''}`}>
        <div className={`relative flex items-center justify-center overflow-hidden ${imageClass}`}>
          {comicData ? (
            <LazyLoadImage
              alt={comicData?.name}
              src={changeWidthImageUrl(comicData.avatar, 200)}
              placeholder={
                <img
                  src={changeWidthImageUrl(comicData.avatar, 10)}
                  className="h-full w-full object-cover"
                />
              }
              threshold={240}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageSkeleton className="h-full w-full" />
          )}
          {!showNewest && <TitleInside name={comicData?.name} className={titleClass} />}
        </div>
      </Link>
      {showNewest && (
        <Link to={`/${lastChapter?.hashName || ''}`}>
          <TitleOutside lastChapter={lastChapter} name={comicData?.name} className={titleClass} />
        </Link>
      )}
    </div>
  );
};

export default ComicCover;
