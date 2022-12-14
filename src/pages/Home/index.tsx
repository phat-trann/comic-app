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
    <div className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
      <div className="">
        {loading || !comics ? (
          <p>Loading</p>
        ) : (
          comics.map((el: any) => (
            <Link to={`/${el.hashName}`}>
              <div key={el._id} className="">
                <div>
                  <img src={el.avatar} className="" />
                  <p className="">{el.name}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
