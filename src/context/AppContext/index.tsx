import React, { useCallback, useReducer, useState } from 'react';
import { ACTIONS } from '~/common/constants';
import { comicDataType } from '~/common/types';
import { getNewUploadComic, getMostViewedComics, getComicsCount } from '~/services/comic.service';

interface stateType {
  comics: comicDataType[];
  mostViewedComics: comicDataType[];
  fetchMostViewedData: Function;
  fetchRecentlyData: Function;
  loadPage: Function;
}

interface numberStateType {
  allComicsCount: number;
  comicsInPage: number;
  currentPage: number;
}

interface actionType {
  type: string;
  payload: comicDataType[];
}

interface actionNumberType {
  type: string;
  payload: number;
}

const reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    case ACTIONS.UPDATE_PAGE_COMICS:
      return {
        ...state,
        comics: action.payload,
      };
    case ACTIONS.LOAD_MOST_VIEWED_COMICS:
      return {
        ...state,
        mostViewedComics: action.payload,
      };
    default:
      return state;
  }
};

const numberReducer = (state: numberStateType, action: actionNumberType): numberStateType => {
  switch (action.type) {
    case ACTIONS.LOAD_COMIC_IN_PAGE:
      return {
        ...state,
        comicsInPage: action.payload,
      };
    case ACTIONS.LOAD_ALL_COMICS_COUNT:
      return {
        ...state,
        allComicsCount: action.payload,
      };
    case ACTIONS.UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const initialState: stateType = {
  comics: [],
  mostViewedComics: [],
  fetchRecentlyData: () => {},
  fetchMostViewedData: () => {},
  loadPage: () => {},
};

const numberInitialState: numberStateType = {
  allComicsCount: 0,
  comicsInPage: 0,
  currentPage: 0,
};

export const AppContext = React.createContext({
  ...initialState,
  ...numberInitialState,
  loading: true,
  resetHomepage: (arg: number) => {},
});

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [numberState, numberDispatch] = useReducer(numberReducer, numberInitialState);

  const fetchMostViewedData = useCallback(async (mostViewedCount: number = 30) => {
    setLoading(true);
    const { error, data } = await getMostViewedComics(mostViewedCount);
    const { error: countError, data: countData } = await getComicsCount();

    if (!countError) {
      numberDispatch({
        type: ACTIONS.LOAD_ALL_COMICS_COUNT,
        payload: countData,
      });
    }

    if (!error)
      dispatch({
        type: ACTIONS.LOAD_MOST_VIEWED_COMICS,
        payload: data,
      });
    setLoading(false);
  }, []);

  const fetchRecentlyData = useCallback(async (newUploadCount: number = 40) => {
    setLoading(true);
    const { error, data } = await getNewUploadComic(newUploadCount);

    numberDispatch({
      type: ACTIONS.LOAD_COMIC_IN_PAGE,
      payload: newUploadCount,
    });

    if (!error) {
      dispatch({
        type: ACTIONS.UPDATE_PAGE_COMICS,
        payload: data,
      });

      numberDispatch({
        type: ACTIONS.UPDATE_CURRENT_PAGE,
        payload: 1,
      });
    }
    setLoading(false);
  }, []);
  const loadPage = useCallback(async (pageIndex: number, pageSize: number) => {
    setLoading(true);
    const { error, data } = await getNewUploadComic(pageSize, pageSize * (pageIndex - 1));

    if (!error) {
      dispatch({
        type: ACTIONS.UPDATE_PAGE_COMICS,
        payload: data,
      });
    }

    numberDispatch({
      type: ACTIONS.UPDATE_CURRENT_PAGE,
      payload: pageIndex,
    });

    setLoading(false);
  }, []);

  const resetHomepage = useCallback((currentPage: number) => {
    setLoading(false);

    if (currentPage !== 1) {
      dispatch({
        type: ACTIONS.UPDATE_PAGE_COMICS,
        payload: [],
      });
      numberDispatch({
        type: ACTIONS.UPDATE_CURRENT_PAGE,
        payload: 1,
      });
    }
  }, []);

  const value = {
    fetchMostViewedData,
    fetchRecentlyData,
    loadPage,
    mostViewedComics: state.mostViewedComics,
    comics: state.comics,
    allComicsCount: numberState.allComicsCount,
    comicsInPage: numberState.comicsInPage,
    currentPage: numberState.currentPage,
    loading,
    resetHomepage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
