import React, { useCallback, useReducer } from 'react';
import { ACTIONS } from '~/common/constants';
import { comicDataType } from '~/common/types';
import comicService from '~/services/comic.service';

interface stateType {
  comic: comicDataType | null;
  fetchData: Function;
}

interface actionType {
  type: string;
  payload?: comicDataType;
}

const reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    case ACTIONS.LOAD_COMIC:
      return {
        ...state,
        comic: action.payload || state.comic,
      };
    default:
      return state;
  }
};

const initialState: stateType = {
  comic: null,
  fetchData: () => {},
};

export const ComicContext = React.createContext(initialState);

const ComicContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async (id: string) => {
    const { error, data } = await comicService.getComicDetail(id);

    if (!error)
      dispatch({
        type: ACTIONS.LOAD_COMIC,
        payload: data,
      });
  }, []);

  const value = {
    comic: state.comic,
    fetchData,
  };

  return <ComicContext.Provider value={value}>{children}</ComicContext.Provider>;
};

export default ComicContextProvider;
