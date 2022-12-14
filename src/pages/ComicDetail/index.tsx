import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { diffDate, formatView } from '../../common/helpers/formatData';
import style from './detail.module.css';

function Home() {
  const [comics, setComics] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const results: { error: boolean; data: any } = await axios.get(
        `${import.meta.env.VITE_HOST}/comic/search?limit=50`
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
                <p className={style.name}>Views: {formatView(el.views)}</p>
                <p className={style.name}>Followers: {el.followers}</p>
                <p className={style.name}>Chapters: {el.chapters.length}</p>
                {el.chapters.map((ell: any) => (
                  <div key={ell._id}>
                    <Link to={`/${ell.hashName}`} className={style.custom_link}>
                      {ell.name} - {formatView(ell.views)} -{' '}
                      {diffDate(ell.updateDate, Date.now())}
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

export default Home;
