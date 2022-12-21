import React, { useCallback, useReducer, useState } from 'react';
import { ACTIONS } from '~/common/constants';
import { comicDataType } from '~/common/types';
import { getNewUploadComic, getMostViewedComics, getComicsCount } from '~/services/comic.service';

interface stateType {
  mostViewedComics: comicDataType[];
  pageComics: {
    [key: number]: comicDataType[];
  };
  fetchData: Function;
  loadPage: Function;
}

interface numberStateType {
  allComicsCount: number;
  comicsInPage: number;
  currentPage: number;
}

interface actionType {
  type: string;
  payload: {
    comicData: comicDataType[];
    number: number;
  };
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
        pageComics: {
          ...state.pageComics,
          [action.payload.number]: action.payload.comicData,
        },
      };
    case ACTIONS.LOAD_MOST_VIEWED_COMICS:
      return {
        ...state,
        mostViewedComics: action.payload.comicData,
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
  mostViewedComics: [],
  fetchData: () => {},
  loadPage: () => {},
  pageComics: {
    0: [],
  },
};

const numberInitialState: numberStateType = {
  allComicsCount: 0,
  comicsInPage: 0,
  currentPage: 0,
};

export const AppContext = React.createContext({
  ...initialState,
  ...numberInitialState,
  loading: false,
});

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [numberState, numberDispatch] = useReducer(numberReducer, numberInitialState);

  const fetchData = useCallback(
    async (newUploadCount: number = 40, mostViewedCount: number = 30) => {
      setLoading(true);
      const [
        { error, data },
        { error: mostViewedError, data: mostViewedData },
        { error: countError, data: countData },
      ] = await Promise.all([
        getNewUploadComic(newUploadCount),
        getMostViewedComics(mostViewedCount),
        getComicsCount(),
      ]);

      numberDispatch({
        type: ACTIONS.LOAD_COMIC_IN_PAGE,
        payload: newUploadCount,
      });

      if (!countError) {
        numberDispatch({
          type: ACTIONS.LOAD_ALL_COMICS_COUNT,
          payload: countData,
        });
      }

      if (!error) {
        dispatch({
          type: ACTIONS.UPDATE_PAGE_COMICS,
          payload: {
            number: 1,
            comicData: data,
          },
        });

        numberDispatch({
          type: ACTIONS.UPDATE_CURRENT_PAGE,
          payload: 1,
        });
      }
      if (!mostViewedError)
        dispatch({
          type: ACTIONS.LOAD_MOST_VIEWED_COMICS,
          payload: {
            comicData: mostViewedData,
            number: 1,
          },
        });
      setLoading(false);
    },
    [],
  );

  const loadPage = useCallback(
    async (pageIndex: number, pageSize: number, pageComics: comicDataType[]) => {
      setLoading(true);
      if (pageComics[pageIndex] === undefined) {
        const { error, data } = await getNewUploadComic(pageSize, pageSize * (pageIndex - 1));

        if (!error) {
          dispatch({
            type: ACTIONS.UPDATE_PAGE_COMICS,
            payload: {
              number: pageIndex,
              comicData: data,
            },
          });
        }
      }

      numberDispatch({
        type: ACTIONS.UPDATE_CURRENT_PAGE,
        payload: pageIndex,
      });

      setLoading(false);
    },
    [],
  );

  const value = {
    fetchData,
    loadPage,
    mostViewedComics: state.mostViewedComics,
    pageComics: state.pageComics,
    allComicsCount: numberState.allComicsCount,
    comicsInPage: numberState.comicsInPage,
    currentPage: numberState.currentPage,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
