import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './main.module.css';

function App() {
  const [comics, setComics] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const results: { error: boolean; data: any } = await axios.get(
        'http://localhost:3000/comic/search?limit=40'
      );

      if (!results?.error && !results?.data?.error) {
        setLoading(false);
        console.log(results);
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
              <img src={el.avatar} className={style.image} />
              <p className={style.name}>{el.hashName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
