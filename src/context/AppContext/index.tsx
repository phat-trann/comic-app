import React, { useEffect, useReducer } from 'react';
import { comicDataType } from '~/common/types';
import comicService from '~/services/comic.service';

interface stateType {
  comics: comicDataType[] | null[];
  mostViewedComics: comicDataType[] | null[];
}

interface actionType {
  type: string;
  comics?: comicDataType[];
  mostViewedComics?: comicDataType[];
}

const initialState: stateType = {
  comics: [...new Array(50).fill(null)],
  mostViewedComics: [...new Array(40).fill(null)],
};

export const AppContext = React.createContext(initialState);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const actions = {
    LOAD_COMICS: 'LOAD_COMICS',
    LOAD_MOST_VIEWED_COMICS: 'LOAD_MOST_VIEWED_COMICS',
  };
  const reducer = (state: stateType, action: actionType): stateType => {
    switch (action.type) {
      case actions.LOAD_COMICS:
        return {
          ...state,
          comics: action.comics || state.comics,
        };
      case actions.LOAD_MOST_VIEWED_COMICS:
        return {
          ...state,
          mostViewedComics: action.mostViewedComics || state.mostViewedComics,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const { data: mostViewedData } = await comicService.getMostViewedComics(40);
      const { data: abcData } = await comicService.getABCComic(50);

      if (!mostViewedData.error)
        dispatch({
          type: actions.LOAD_COMICS,
          comics: abcData.data,
        });
      if (!abcData.error)
        dispatch({
          type: actions.LOAD_MOST_VIEWED_COMICS,
          mostViewedComics: mostViewedData.data,
        });
    })();
  }, []);
  const value = {
    comics: state.comics,
    mostViewedComics: state.mostViewedComics,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
