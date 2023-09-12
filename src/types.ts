export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    description: string;
  };
}

export interface IAPIResponse {
  totalItems: number;
  items: IBook[];
}
