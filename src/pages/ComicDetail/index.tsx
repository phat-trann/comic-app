import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ERROR_TEXT } from '~/common/constants';
import { diffDate, formatView } from '~/common/helpers/formatData';
import { useCallApiOnce } from '~/hooks';
import comicService from '~/services/comic.service';

function ComicDetail() {
  const { id } = useParams();
  const { data, loading, error } = useCallApiOnce(
    async () => await comicService.getComicDetail(id || ''),
  );
  const currentComic = useMemo(() => data?.data, [data?.data]);

  if (error?.error || data?.error) return <div>{error?.message || ERROR_TEXT}</div>;

  return (
    <div className="">
      <div className="">
        {loading || !currentComic ? (
          <p>Loading</p>
        ) : (
          <div key={currentComic._id} className="">
            <div>
              <img src={currentComic.avatar} className="" />
              <p className="">Name: {currentComic.name}</p>
              <p className="">Another name: {currentComic.anotherName.join(', ')}</p>
              <p className="">Artists: {currentComic.artists.join(', ')}</p>
              <p className="">Authors: {currentComic.authors.join(', ')}</p>
              <p className="">Description: {currentComic.description}</p>
              <p className="">Category: {currentComic.category.join(', ')}</p>
              <p className="">Status: {currentComic.isDone ? 'Done' : 'In Progress'}</p>
              <p className="">Views: {formatView(currentComic.views)}</p>
              <p className="">Followers: {currentComic.followers}</p>
              <p className="">Chapters: {currentComic.chapters.length}</p>
              {currentComic.chapters.map((ell: any) => (
                <div key={ell._id}>
                  <Link to={`/${ell.hashName}`} className="">
                    {ell.name} - {formatView(ell.views)} - {diffDate(ell.updateDate, Date.now())}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComicDetail;
