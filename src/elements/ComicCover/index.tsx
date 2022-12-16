import React from 'react';
import { Link } from 'react-router-dom';
import { changeWidthImageUrl } from '../../common/helpers/formatData';
import { comicDataType } from '../../common/types';

const ComicCover: React.FC<{
  comicData: comicDataType | null;
  showNewest: boolean;
}> = ({ comicData, showNewest }) => {
  return (
    <div className="p-3">
      {
        <Link to={`/${comicData?.hashName || ''}`}>
          <div>
            <div className="relative flex h-48 items-center justify-center overflow-hidden">
              {comicData ? (
                <img
                  src={changeWidthImageUrl(comicData.avatar, 150)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="bg-orange-400 w-full h-full"></div>
              )}
              {!showNewest && (
                <div className="absolute bottom-0 h-6 w-full bg-black text-white">
                  <p className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center">
                    {comicData?.name}
                  </p>
                </div>
              )}
            </div>
            {showNewest && <p className="">{comicData?.name}</p>}
          </div>
        </Link>
      }
    </div>
  );
};

export default ComicCover;
