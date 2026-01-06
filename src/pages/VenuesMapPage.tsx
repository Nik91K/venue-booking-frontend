import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPage from '@/layoutPage';
import MapComponent from '@/components/common/map/Map';
import MapProvider from '@/components/common/map/MapProvider';
import EstablishmentCard from '@/components/common/EstablishmentCard';
import FiltrationComponent from '@/components/common/FiltrationComponent';
import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { getAllEstablishments } from '@/api/slices/establishmentSlice';
import { useAppSelector, useAppDispatch } from '@/api/hooks';
import PaginationComponent from '@/components/common/PaginationComponent';

const VenuesMapPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    loading,
    establishments,
    error,
    page,
    take,
    hasNextPage,
    hasPreviousPage,
    pageCount,
  } = useAppSelector(state => state.establishment);
  const { user } = useAppSelector(state => state.auth);

  const userRole = user?.role || 'GUEST';

  useEffect(() => {
    dispatch(getAllEstablishments({ page, take }));
  }, [page, take, dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch({ type: 'establishment/setPage', payload: newPage });
  };

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
                <InputGroupInput placeholder="Search venues..." />
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
                establishments.map(establishment => (
                  <EstablishmentCard
                    key={establishment.id}
                    establishment={establishment}
                    role={userRole}
                    onLogin={handleLogin}
                  />
                ))
              )}
            </div>
            {!loading && establishments.length > 0 && (
              <PaginationComponent
                page={page}
                handlePageChange={handlePageChange}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                pageCount={pageCount}
              />
            )}
          </div>
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-4">
              <FiltrationComponent />
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default VenuesMapPage;
