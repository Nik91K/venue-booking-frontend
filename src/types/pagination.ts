export type PaginationType = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  order: 'ASC' | 'DESC';
};

export type PageType<T> = {
  data: T[];
  meta: PaginationType;
};
