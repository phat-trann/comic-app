import React, { useEffect, useReducer, useState } from 'react';
import { comicDataType } from '~/common/types';
import comicService from '~/services/comic.service';

const initialState = {
  comics: [...new Array(50).fill(null)],
  mostViewedComic: [...new Array(40).fill(null)],
};

export const context = React.createContext(initialState);

const ComicListContext = ({ children }: { children: JSX.Element }) => {
  const actions = {
    LOAD_COMICS: 'LOAD_COMICS',
    LOAD_MOST_VIEWED_COMICS: 'LOAD_MOST_VIEWED_COMICS',
  };
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case actions.LOAD_COMICS:
        return {
          ...state,
          comics: action.comics,
        };
      case actions.LOAD_MOST_VIEWED_COMICS:
        return {
          ...state,
          mostViewedComic: action.mostViewedComic,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const { data: mostViewedData } = await comicService.getMostViewedComic(40);
      const { data: abcData } = await comicService.getABCComic(50);

      if (!mostViewedData.error)
        dispatch({
          type: actions.LOAD_COMICS,
          comics: abcData.data,
        });
      if (!abcData.error)
        dispatch({
          type: actions.LOAD_MOST_VIEWED_COMICS,
          mostViewedComic: mostViewedData.data,
        });
    })();
  }, []);
  const value = {
    comics: state.comics,
    mostViewedComic: state.mostViewedComic,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ComicListContext;
