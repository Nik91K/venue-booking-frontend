import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPage from '@/layoutPage';
import MapComponent from '@components/common/map/Map';
import MapProvider from '@components/common/map/MapProvider';
import EstablishmentCard from '@components/common/cards/EstablishmentCard';
import { Button } from '@components/ui/button';
import { Heart, Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@components/ui/input-group';
import { Spinner } from '@components/ui/spinner';
import { useAppSelector, useAppDispatch } from '@api/hooks';
import PaginationComponent from '@components/common/PaginationComponent';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import { useBookingFormSubmit } from '@hooks/useBookingForm';
import { useEstablishments } from '@hooks/useEstablishments';

const VenuesMapPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookingFormRef, submitBookingForm } = useBookingFormSubmit();
  const {
    establishments,
    loading,
    error,
    meta,
    search,
    handlePageChange,
    handleSearchChange,
  } = useEstablishments();
  const { user } = useAppSelector(state => state.users);
  const { schedule } = useAppSelector(state => state.schedule);

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  }, [error, dispatch]);

  // const showFavorites = async () => {
  //   if (!user || user.role === 'GUEST') {
  //     navigate('/login');
  //     return;
  //   }

  //   if (showingFavorites) {
  //     setEstablishment(establishments);
  //     setShowingFavorites(false);
  //     return;
  //   }

  //   try {
  //     const res = await dispatch(getAllFavorites());
  //     const favorites = res.payload ?? [];
  //     setEstablishment(favorites);
  //     setShowingFavorites(true);
  //   } catch (error) {
  //     dispatch(addError(convertError(error)));
  //     setEstablishment([]);
  //   }
  // };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <LayoutPage>
      <div className="flex flex-col h-full">
        <MapProvider>
          <div className="w-full h-64 md:h-80 lg:h-96">
            <MapComponent />
          </div>
        </MapProvider>
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <InputGroup className="flex-1">
                <InputGroupInput
                  placeholder="Search venues..."
                  value={search}
                  onChange={handleSearchChange}
                />
                <InputGroupAddon>
                  <Search className="w-4 h-4" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  {establishments.length} results
                </InputGroupAddon>
              </InputGroup>
              <Button variant="secondary" size="icon">
                <Heart className="w-5 h-5" color="#f66151" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-12">
                  <Spinner />
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : establishments.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No establishments found</p>
                </div>
              ) : (
                establishments.map(
                  est =>
                    est && (
                      <EstablishmentCard
                        key={est.id}
                        establishment={est}
                        role={user?.role || 'GUEST'}
                        onLogin={handleLogin}
                        bookingFormRef={bookingFormRef}
                        handleAction={submitBookingForm}
                        schedules={schedule[est.id] || []}
                      />
                    )
                )
              )}
            </div>
            {!loading && establishments.length > 0 && (
              <PaginationComponent
                page={meta?.page ?? 1}
                handlePageChange={handlePageChange}
                hasNextPage={meta?.hasNextPage ?? false}
                hasPreviousPage={meta?.hasPreviousPage ?? false}
                pageCount={meta?.pageCount ?? 0}
              />
            )}
          </div>
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-4">
              {/* TO DO */}
              {/* <FiltrationComponent/> */}
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default VenuesMapPage;
