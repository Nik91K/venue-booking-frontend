import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import {
  getAllEstablishments,
  getNearbyEstablishments,
  getEstablishmentByOwner,
} from '@api/slices/establishmentSlice';
import { addError } from '@api/slices/errorSlice';

type FilterParams = {
  minRating?: number;
  typeId?: number;
};

export const useEstablishments = (options?: {
  mode?: 'all' | 'nearby' | 'owner';
  lat?: number;
  lng?: number;
  radius?: number;
}) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterParams>({});
  const [page, setPage] = useState(1);

  const { loading, establishments, error, meta } = useAppSelector(
    state => state.establishment
  );

  const { mode, lat, lng, radius } = options ?? {};

  useEffect(() => {
    const isNearby = mode === 'nearby';
    const isOwner = mode === 'owner';

    if (isNearby && (!lat || !lng)) {
      dispatch(
        addError({
          type: 'error',
          title: 'Error',
          message: 'No coordinates for nearby search',
        })
      );
      return;
    }

    if (isOwner) {
      dispatch(getEstablishmentByOwner());
      return;
    }

    if (isNearby) {
      dispatch(
        getNearbyEstablishments({
          page,
          take: meta?.take ?? 9,
          search,
          lat: lat!,
          lng: lng!,
          radius: radius ?? 5,
        })
      );
    } else {
      dispatch(
        getAllEstablishments({
          page,
          take: meta?.take ?? 9,
          search,
          minRating: filters.minRating,
          typeId: filters.typeId,
        })
      );
    }
  }, [dispatch, mode, lat, lng, radius, page, search, filters, meta?.take]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilter = (filters: FilterParams) => {
    setFilters(filters);
    setPage(1);
  };

  const debouncedFetch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
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
    handleSearchChange,
    handlePageChange,
    handleFilter,
  };
};
