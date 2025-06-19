import { baseApi } from '../../../shared/api/baseApi';
import type { Book, BookListResponse } from '../model/types';

export const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBookById: build.query<Book, string>({
      query: (id) => `books/${id}`,
    }),
    searchBooks: build.query<
      BookListResponse,
      { query: string; page?: number }
    >({ query: ({ query, page = 1 }) => `search/${query}/${page}` }),
  }),
});

export const { useGetBookByIdQuery, useSearchBooksQuery } = bookApi;
