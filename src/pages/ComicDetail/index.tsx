import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { diffDate, formatView } from '~/common/helpers/formatData';

function Home() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentComic, setCurrentComic] = useState<any>();
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const results: { error: boolean; data: any } = await axios.get(
          `${import.meta.env.VITE_HOST}/comic/${id}`
        );

        if (!results?.error && !results?.data?.error) {
          setCurrentComic(results.data);
        } else {
          setError(results.error || results.data.error);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    })();
  }, [id]);

  if (error) return <div>{error}</div>;

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
              <p className="">
                Another name: {currentComic.anotherName.join(', ')}
              </p>
              <p className="">Artists: {currentComic.artists.join(', ')}</p>
              <p className="">Authors: {currentComic.authors.join(', ')}</p>
              <p className="">Description: {currentComic.description}</p>
              <p className="">Category: {currentComic.category.join(', ')}</p>
              <p className="">
                Status: {currentComic.isDone ? 'Done' : 'In Progress'}
              </p>
              <p className="">Views: {formatView(currentComic.views)}</p>
              <p className="">Followers: {currentComic.followers}</p>
              <p className="">Chapters: {currentComic.chapters.length}</p>
              {currentComic.chapters.map((ell: any) => (
                <div key={ell._id}>
                  <Link to={`/${ell.hashName}`} className="">
                    {ell.name} - {formatView(ell.views)} -{' '}
                    {diffDate(ell.updateDate, Date.now())}
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

export default Home;
