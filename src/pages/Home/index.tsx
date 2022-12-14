import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="w-screen">
      <div className="flex w-full flex-wrap">
        {loading || !comics ? (
          <p>Loading</p>
        ) : (
          comics.map((el: any) => (
            <div key={el._id} className="w-1/6">
              <Link to={`/${el.hashName}`}>
                <div>
                  <img src={el.avatar} className="" />
                  <p className="">{el.name}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
