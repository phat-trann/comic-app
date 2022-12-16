import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { diffDate, formatView } from '~/common/helpers/formatData';

const Chapters = () => {
  const { id, chap } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [images, setImages] = useState<Array<undefined | string>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const results: { error: boolean; data: any } = await axios.get(
          `${import.meta.env.VITE_HOST}/comic/${id}/${chap}`
        );

        if (!results?.error && !results?.data?.error) {
          const { images, ...data } = results.data;
          setImages(images);
          setData(data);
        } else {
          setError(results.error || results.data.error);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    })();
  }, [id, chap]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            {data.name} - {formatView(data.views)} -{' '}
            {diffDate(data.updateDate, Date.now())}
          </div>
          <div>
            {images.map((el, index) => (
              <img src={el} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Chapters;
