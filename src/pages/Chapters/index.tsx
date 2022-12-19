import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ERROR_TEXT } from '~/common/constants';
import { diffDate, formatView } from '~/common/helpers/formatData';
import { useCallApiOnce } from '~/hooks';
import comicService from '~/services/comic.service';

const Chapters = () => {
  const { id, chap } = useParams();
  const { data, loading, error } = useCallApiOnce(
    async () => await comicService.getChapterDetail(id || '', chap || ''),
  );
  const images = useMemo(() => data?.data?.images, [data]);

  if (error?.error || data?.error) return <p>{error?.message || ERROR_TEXT}</p>;

  return (
    <div>
      {loading || !data || !images?.length ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            {data.data.name} - {formatView(data.data.views)} -{' '}
            {diffDate(data.data.updateDate, Date.now())}
          </div>
          <div>
            {images.map((el: any, index: any) => (
              <img src={el} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Chapters;
