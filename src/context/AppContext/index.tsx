import React, { useCallback, useContext, useReducer } from 'react';
import { ACTIONS } from '~/common/constants';
import { comicDataType } from '~/common/types';
import comicService from '~/services/comic.service';

interface stateType {
  comics: comicDataType[] | null[];
  mostViewedComics: comicDataType[] | null[];
  fetchData: Function;
}

interface actionType {
  type: string;
  payload?: comicDataType[];
}

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
  comics: [],
  mostViewedComics: [],
  fetchData: () => {},
};

export const AppContext = React.createContext(initialState);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    const { error, data } = await comicService.getABCComic(50);
    const { error: mostViewedError, data: mostViewedData } = await comicService.getMostViewedComics(
      40,
    );

    if (!error)
      dispatch({
        type: ACTIONS.LOAD_COMICS,
        payload: data,
      });
    if (!mostViewedError)
      dispatch({
        type: ACTIONS.LOAD_MOST_VIEWED_COMICS,
        payload: mostViewedData,
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
