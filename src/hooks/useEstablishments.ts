import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { getAllEstablishments } from '@api/slices/establishmentSlice';

export const useEstablishments = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const { loading, establishments, error, meta } = useAppSelector(
    state => state.establishment
  );

  const fetchEstablishments = useCallback(
    (searchValue: string, currentPage: number) => {
      dispatch(
        getAllEstablishments({
          page: currentPage,
          take: meta?.take ?? 9,
          search: searchValue,
        })
      );
    },
    [dispatch, meta?.take]
  );

  const handlePageChange = (newPage: number) => {
    fetchEstablishments(search, newPage);
  };

  const debouncedFetch = useDebouncedCallback((value: string) => {
    handlePageChange(1);
    fetchEstablishments(value, 1);
  }, 400);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedFetch(e.target.value);
  };

  return {
    establishments,
    loading,
    error,
    meta,
    search,
    fetchEstablishments,
    handlePageChange,
    debouncedFetch,
    handleSearchChange,
  };
};
