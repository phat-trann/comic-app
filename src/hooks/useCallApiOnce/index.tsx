import { useEffect, useRef, useState } from 'react';
import { ERROR_TEXT } from '~/common/constants';

interface errorType {
  error: boolean;
  message: string;
}

const useCallApiOnce = <T,>(
  asyncFunction: () => Promise<T>,
  dependencies?: unknown[],
): { data: T | null; loading: boolean; error: errorType } => {
  const isMounted = useRef(false);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<errorType>({ error: false, message: '' });

  useEffect(() => {
    (async () => {
      try {
        if (!isMounted.current) {
          if (
            (dependencies &&
              dependencies.some((dependency) => {
                if (!dependency) return true;
                if (typeof dependency === 'object' && Object.keys(dependency).length === 0)
                  return true;
              })) ||
            !dependencies
          )
            setData(await asyncFunction());
          setLoading(false);
        }
      } catch (error: any) {
        setError({ error: true, message: error?.message || ERROR_TEXT });
      }
    })();

    return () => {
      isMounted.current = true;
    };
  }, []);

  return { data, loading, error };
};

export default useCallApiOnce;
