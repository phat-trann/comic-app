import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOADING_TEXT } from '~/common/constants';
import { changeWidthImageUrl, diffDate, formatView } from '~/common/helpers/formatData';
import { comicDataType, chapterType } from '~/common/types';
import Views from '~/icons/Views';

const TitleInside: React.FC<{ name?: string }> = ({ name }) => (
  <div className="absolute bottom-0 h-7 w-full bg-gradient-to-b from-transparent to-gray-900 text-white">
    <p className="w-full px-1 text-center line-clamp-1">{name || LOADING_TEXT}</p>
  </div>
);

const TitleOutside: React.FC<{ lastChapter?: chapterType; name?: string }> = ({
  lastChapter,
  name,
}) => (
  <>
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
  </>
);

const ComicCover: React.FC<{
  comicData: comicDataType | null;
  showNewest: boolean;
}> = ({ comicData, showNewest }) => {
  const [lastChapter, setLastChapter] = useState<chapterType>();

  useEffect(() => {
    setLastChapter(comicData?.chapters[comicData.chapters.length - 1]);
  }, [comicData?.chapters]);

  return (
    <div className="p-4">
      <Link to={`/${comicData?.hashName || ''}`}>
        <div>
          <div className="relative flex h-48 items-center justify-center overflow-hidden">
            {comicData ? (
              <img
                src={changeWidthImageUrl(comicData.avatar, 150)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-orange-400"></div>
            )}
            {!showNewest && <TitleInside name={comicData?.name} />}
          </div>
        </div>
      </Link>
      {showNewest && (
        <Link to={`/${lastChapter?.hashName || ''}`}>
          <TitleOutside lastChapter={lastChapter} name={comicData?.name} />
        </Link>
      )}
    </div>
  );
};

export default ComicCover;
