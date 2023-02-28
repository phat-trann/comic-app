export interface chapterType {
  _id: number;
  name: string;
  updateDate: number;
  views: number;
  hashName: string;
}

export interface chapterDetailType extends chapterType {
  images: Array<string>;
}

export interface comicDataType {
  _id: number;
  hashName: string;
  name: string;
  anotherName: Array<string>;
  artists: Array<string>;
  authors: Array<string>;
  avatar: string;
  description?: string;
  isDone: boolean;
  category: Array<string>;
  views: number;
  followers: number;
  chapters: Array<chapterType>;
  chaptersLength: number;
  lastUpload: number;
  likes: number;
  voteCount: number;
  voteSum: number;
  lastChapter: chapterType;
}
