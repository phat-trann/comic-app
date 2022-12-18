import React, { useCallback, useContext, useReducer } from 'react';
import { comicDataType } from '~/common/types';
import comicService from '~/services/comic.service';

interface stateType {
  comics: comicDataType[] | null[];
  mostViewedComics: comicDataType[] | null[];
  fetchData: () => Promise<void> | void;
}

interface actionType {
  type: string;
  payload?: comicDataType[];
}

const ACTIONS = {
  LOAD_COMICS: 'LOAD_COMICS',
  LOAD_MOST_VIEWED_COMICS: 'LOAD_MOST_VIEWED_COMICS',
};

const reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    case ACTIONS.LOAD_COMICS:
      return {
        ...state,
        comics: action.payload || state.comics,
      };
    case ACTIONS.LOAD_MOST_VIEWED_COMICS:
      return {
        ...state,
        mostViewedComics: action.payload || state.mostViewedComics,
      };
    default:
      return state;
  }
};

const initialState: stateType = {
  comics: [...new Array(50).fill(null)],
  mostViewedComics: [...new Array(40).fill(null)],
  fetchData: () => {},
};

export const AppContext = React.createContext(initialState);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    const { data: abcData } = await comicService.getABCComic(50);
    const { data: mostViewedData } = await comicService.getMostViewedComics(40);

    if (!mostViewedData.error)
      dispatch({
        type: ACTIONS.LOAD_COMICS,
        payload: abcData.data,
      });
    if (!abcData.error)
      dispatch({
        type: ACTIONS.LOAD_MOST_VIEWED_COMICS,
        payload: mostViewedData.data,
      });
  }, []);

  const value = {
    comics: state.comics,
    mostViewedComics: state.mostViewedComics,
    fetchData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
