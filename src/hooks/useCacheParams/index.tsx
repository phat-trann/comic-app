import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  const getSearchParams = useCallback((key: string) => {
    return searchParams.get(key) || '';
  }, []);

  useEffect(() => {
    setSearchParams({});
  }, []);

  return [getSearchParams, setParams] as const;
};

export default useCacheParams;
