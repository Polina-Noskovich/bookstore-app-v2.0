export interface Book {
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface BookListResponse {
  total: string;
  page: number;
  books: Book[];
}
