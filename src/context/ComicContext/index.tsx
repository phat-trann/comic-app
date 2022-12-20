import React, { useCallback, useReducer } from 'react';
import { ACTIONS } from '~/common/constants';
import { chapterDetailType, comicDataType } from '~/common/types';
import comicService from '~/services/comic.service';

interface stateType {
  comic: comicDataType | null;
  chapters: {
    [name: string]: chapterDetailType;
  };
  fetchData: Function;
  getChapter: Function;
}

interface actionType {
  type: string;
  payload: {
    chap?: string;
    data: comicDataType | chapterDetailType;
  };
}

const reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    case ACTIONS.LOAD_COMIC:
      return {
        ...state,
        comic: (action.payload.data as comicDataType) || state.comic,
      };
    case ACTIONS.LOAD_CHAPTER:
      return {
        ...state,
        chapters: {
          ...state.chapters,
          [action.payload?.chap || '']: action.payload.data as chapterDetailType,
        },
      };
    default:
      return state;
  }
};

const initialState: stateType = {
  comic: null,
  chapters: {},
  fetchData: () => {},
  getChapter: () => {},
};

export const ComicContext = React.createContext(initialState);

const ComicContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async (id: string) => {
    const { error, data } = await comicService.getComicDetail(id);

    if (!error)
      dispatch({
        type: ACTIONS.LOAD_COMIC,
        payload: {
          data,
        },
      });
  }, []);

  const getChapter = useCallback(async (id: string, chap: string) => {
    const { error, data } = await comicService.getChapterDetail(id, chap);

    if (!error)
      dispatch({
        type: ACTIONS.LOAD_CHAPTER,
        payload: {
          chap: chap,
          data: data,
        },
      });
  }, []);

  const value = {
    comic: state.comic,
    chapters: state.chapters,
    fetchData,
    getChapter,
  };

  return <ComicContext.Provider value={value}>{children}</ComicContext.Provider>;
};

export default ComicContextProvider;
