import React, { useCallback, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

const useCacheParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setParams = useCallback((params: { [key: string]: any }) => {
    let currentParams: { [key: string]: any } = {};

    Object.keys(params).forEach((key: string) => {
      if (params[key]) {
        currentParams[key] = params[key];
      }
    });

    setSearchParams(currentParams);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const getSearchParams = useCallback((key: string) => {
    return searchParams.get(key) || '';
  }, []);

  useEffect(() => {
    navigate(location.pathname, { replace: true });
  }, []);

  return [getSearchParams, setParams] as const;
};

export default useCacheParams;
