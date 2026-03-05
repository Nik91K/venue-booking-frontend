import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { getAllEstablishments } from '@api/slices/establishmentSlice';

type FilterParams = {
  minRating?: number;
  typeId?: number;
};

export const useEstablishments = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterParams>({});
  const { loading, establishments, error, meta } = useAppSelector(
    state => state.establishment
  );

  const fetchEstablishments = useCallback(
    (
      searchValue: string,
      currentPage: number,
      currentFilters: FilterParams = {}
    ) => {
      dispatch(
        getAllEstablishments({
          page: currentPage,
          take: meta?.take ?? 9,
          search: searchValue,
          minRating: currentFilters.minRating,
          typeId: currentFilters.typeId,
        })
      );
    },
    [dispatch, meta?.take]
  );

  useEffect(() => {
    fetchEstablishments('', 1, {});
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchEstablishments(search, newPage, filters);
  };

  const handleFilter = (filters: FilterParams) => {
    setFilters(filters);
    fetchEstablishments(search, 1, filters);
  };

  const debouncedFetch = useDebouncedCallback((value: string) => {
    fetchEstablishments(value, 1, filters);
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
    handleFilter,
    debouncedFetch,
    handleSearchChange,
  };
};
