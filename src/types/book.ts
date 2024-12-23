export type BookInfoType = {
  title: string;
  contents?: string;
  url?: string;
  isbn: string;
  datetime?: string;
  authors: string[];
  publisher?: string;
  translators?: string[];
  price?: string;
  thumbnail?: string;
  status: string;
};

export type InfoListItemType = {
  title: string;
  des?: string;
  children?: React.ReactNode;
};

export type UserBooksType = {
  isbn: string;
  authors: string[];
  comment: string;
  cover: string;
  startDate: string;
  endDate: string;
  rate: string;
  status: string;
  title: string;
};
