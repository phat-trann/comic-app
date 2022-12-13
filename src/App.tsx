import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './main.module.css';

import {
  useRoutes,
  useParams,
  Outlet,
  BrowserRouter,
  Link,
} from 'react-router-dom';
const Chapter = () => {
  const { id, chap } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Array<undefined | string>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const results: { error: boolean; data: any } = await axios.get(
          `http://localhost:3000/comic/${id}/${chap}`
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

function App() {
  const [comics, setComics] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const results: { error: boolean; data: any } = await axios.get(
        'http://localhost:3000/comic/search?limit=10'
      );

      if (!results?.error && !results?.data?.error) {
        setLoading(false);
        setComics(results.data.data);
      }
    })();
  }, []);

  return (
    <div className={style.app}>
      <div className={style.main}>
        {loading || !comics ? (
          <p>Loading</p>
        ) : (
          comics.map((el: any) => (
            <div key={el._id} className={style.div}>
              <div>
                <img src={el.avatar} className={style.image} />
                <p className={style.name}>Name: {el.name}</p>
                <p className={style.name}>
                  Another name: {el.anotherName.join(', ')}
                </p>
                <p className={style.name}>Artists: {el.artists.join(', ')}</p>
                <p className={style.name}>Authors: {el.authors.join(', ')}</p>
                <p className={style.name}>Description: {el.description}</p>
                <p className={style.name}>Category: {el.category.join(', ')}</p>
                <p className={style.name}>
                  Status: {el.isDone ? 'Done' : 'In Progress'}
                </p>
                <p className={style.name}>Views: {el.views}</p>
                <p className={style.name}>Followers: {el.followers}</p>
                <p className={style.name}>Chapters: {el.chapters.length}</p>
                {el.chapters.map((ell: any) => (
                  <div key={ell._id}>
                    <Link to={`/${el.hashName}/${new Date(ell.updateDate).getTime()}`}>
                      {ell.name} - {ell.views} views - {ell.updateDate}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const Routes = () => {
  return useRoutes([
    {
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/',
          element: <App />,
        },
        {
          path: '/:id/:chap',
          element: <Chapter />,
        },
      ],
    },
  ]);
};

function App1() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App1;
