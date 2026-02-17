import LayoutPage from '@/layoutPage';
import { useEffect, useState } from 'react';
import {
  getAllEstablishments,
  deleteEstablishment,
  getEstablishmentById,
  updateEstablishment,
} from '@api/slices/establishmentSlice';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import { Search } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import PaginationComponent from '@components/common/PaginationComponent';
import { getBookingsByEstablishment } from '@api/slices/bookingSlice';
import EditEstablishmentDialog from '@components/common/dialog/EditEstablishmentDialog';
import EstablishmentBookingsDialog from '@components/common/dialog/EstablishmentBookingsDialog';
import AdminEstablishmentColumns from '@components/adminComponents/columns/AdminEstablishmentColumns';
import DataTable from '@components/common/DataTable';
import type { EstablishmentType } from '@/types/establishment';

const AdminEstablishmentsPage = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');

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
  const { bookings, loading: bookingsLoading } = useAppSelector(
    state => state.booking
  );

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getAllEstablishments({ page, take }));
  }, [page, take, dispatch]);

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
    getEstablishmentById(establishmentId);
    dispatch(getBookingsByEstablishment(establishmentId));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEstablishment(id));
  };

  const handlePageChange = (newPage: number) => {
    dispatch({ type: 'establishment/setPage', payload: newPage });
  };

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
        className="text-destructive"
        onClick={() => handleDelete(establishment.id)}
      >
        Delete Establishment
      </DropdownMenuItem>
    </>
  );

  return (
    <LayoutPage>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Establishments Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all establishments on the platform
            </p>
          </div>
        </div>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Establishments</CardTitle>
            <CardDescription>Search and filter establishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <InputGroup>
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Search by name or id..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10"
                  />
                  <InputGroupAddon align="inline-end">
                    {establishments.length} results
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="flex gap-2">
                <Button size="sm">All</Button>
              </div>
            </div>

            <div className="rounded-md border border-border">
              <DataTable
                data={establishments}
                columns={AdminEstablishmentColumns}
                emptyMessage="No establishments found"
                loading={loading}
                rowActions={userRowActions}
              />
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
          </CardContent>
        </Card>
      </div>
    </LayoutPage>
  );
};

export default AdminEstablishmentsPage;
