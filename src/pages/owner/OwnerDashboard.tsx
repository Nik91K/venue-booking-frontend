import LayoutPage from '@/layoutPage';
import DataTable from '@components/common/DataTable';
import type { EstablishmentType } from '@/types/establishment';
import {
  getEstablishmentByOwner,
  deleteEstablishment,
  updateEstablishment,
} from '@api/slices/establishmentSlice';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { useEffect } from 'react';
import EstablishmentColumns from '@components/tableColumns/establishmentColumns';
import EditEstablishmentDialog from '@components/common/dialog/EditEstablishmentDialog';
import EstablishmentBookingsDialog from '@components/common/dialog/EstablishmentBookingsDialog';
import {
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu';
import { getBookingsByEstablishment } from '@api/slices/bookingSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { useEstablishments } from '@hooks/useEstablishments';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import { Search } from 'lucide-react';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';

const OwnerDashboard = () => {
  const dispatch = useAppDispatch();

  const {
    establishments,
    loading,
    error,
    meta,
    search,
    handlePageChange,
    handleSearchChange,
  } = useEstablishments();
  const { bookings, loading: bookingsLoading } = useAppSelector(
    state => state.booking
  );

  useEffect(() => {
    dispatch(getEstablishmentByOwner());
  }, [dispatch]);

  const handleUpdateEstablishment = (
    establishmentId: number,
    updateData: { name?: string; description?: string; address?: string }
  ) => {
    dispatch(
      updateEstablishment({
        id: establishmentId,
        data: updateData,
      })
    );
  };

  const handleViewBookings = (establishmentId: number) => {
    dispatch(getBookingsByEstablishment(establishmentId));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEstablishment(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  }, [error, dispatch]);

  const userRowActions = (establishment: EstablishmentType) => (
    <>
      <EditEstablishmentDialog
        establishment={establishment}
        onUpdate={handleUpdateEstablishment}
      />
      <EstablishmentBookingsDialog
        establishmentId={establishment.id}
        establishmentName={establishment.name}
        bookings={bookings}
        loading={bookingsLoading}
        onOpen={() => handleViewBookings(establishment.id)}
      />
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        onClick={() => handleDelete(establishment.id)}
      >
        Delete Establishment
      </DropdownMenuItem>
    </>
  );

  return (
    <LayoutPage>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Establishments</CardTitle>
          <CardDescription>Search and filter establishments</CardDescription>
        </CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search by name or id..."
                value={search}
                onChange={handleSearchChange}
                className="pl-10"
              />
              <InputGroupAddon align="inline-end">
                {establishments.length}
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <CardContent>
          <DataTable
            data={establishments}
            columns={EstablishmentColumns}
            emptyMessage="No establishments found"
            loading={loading}
            rowActions={userRowActions}
            pagination={{
              page: meta?.page ?? 1,
              hasNextPage: meta?.hasNextPage ?? false,
              hasPreviousPage: meta?.hasPreviousPage ?? false,
              pageCount: meta?.pageCount ?? 0,
              onPageChange: handlePageChange,
            }}
          />
        </CardContent>
      </Card>
    </LayoutPage>
  );
};

export default OwnerDashboard;
