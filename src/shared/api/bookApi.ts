import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}
export interface BookDetail extends Book {
  authors: string;
  publisher: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
}

export interface SearchResponse {
  total: string;
  page: string;
  books: Book[];
}
export interface NewResponse {
  total: string;
  books: Book[];
}

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.itbook.store/1.0/' }),
  endpoints: (builder) => ({
    searchBooks: builder.query<SearchResponse, { query: string; page: number }>(
      {
        query: ({ query, page }) => `search/${query}/${page}`,
      },
    ),
    getBook: builder.query<BookDetail, string>({
      query: (isbn) => `books/${isbn}`,
    }),
    getNewBooks: builder.query<NewResponse, void>({
      query: () => `new`,
    }),
  }),
});

export const { useSearchBooksQuery, useGetBookQuery, useGetNewBooksQuery } =
  bookApi;
