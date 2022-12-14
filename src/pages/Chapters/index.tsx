import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chapters = () => {
  const { id, chap } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Array<undefined | string>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const results: { error: boolean; data: any } = await axios.get(
          `${import.meta.env.VITE_HOST}/comic/${id}/${chap}`
        );

        if (!results?.error && !results?.data?.error) {
          setImages(results.data.images);
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

  console.log(error);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          {images.map((el, index) => (
            <img src={el} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapters;
