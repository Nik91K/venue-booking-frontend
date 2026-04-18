import LayoutPage from '@/layoutPage';
import { useEffect } from 'react';
import {
  deleteEstablishment,
  updateEstablishment,
  createEstablishment,
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
import { DropdownMenuSeparator } from '@components/ui/dropdown-menu';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import { getBookingsByEstablishment } from '@api/slices/bookingSlice';
import EditEstablishmentDialog from '@/components/common/dialog/EditEstablishment';
import EstablishmentBookingsDialog from '@/components/common/dialog/EstablishmentBookings';
import EstablishmentColumns from '@components/tableColumns/establishmentColumns';
import DataTable from '@components/common/DataTable';
import type {
  EstablishmentType,
  UpdateEstablishmentType,
} from '@/types/establishment';
import { useEstablishments } from '@hooks/useEstablishments';
import CreateEstablishmentDialog from '@/components/common/dialog/CreateEstablishment';
import AppDialogComponent from '@components/common/alert/ConfirmDialog';
import { getAllEstablishmentTypes } from '@api/slices/establishmentTypeSlice';
import ModeratorManagement from '@components/common/dialog/ModeratorsManager';
import {
  getEstablishmentModerators,
  addEstablishmentModerator,
  removeEstablishmentModerator,
} from '@api/slices/moderatorSlice';

const AdminEstablishmentsPage = () => {
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

  const { establishmentType } = useAppSelector(
    state => state.establishmentType
  );

  const { moderators, moderatorsLoading } = useAppSelector(
    state => state.moderotors
  );

  useEffect(() => {
    if (!establishmentType.length) {
      dispatch(getAllEstablishmentTypes());
    }
  });

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  }, [error, dispatch]);

  const handleUpdateEstablishment = (
    establishmentId: number,
    updateData: UpdateEstablishmentType
  ) => {
    dispatch(
      updateEstablishment({
        id: establishmentId,
        data: {
          name: updateData.name,
          description: updateData.description,
          totalSeats: updateData.totalSeats,
          typeId: updateData.typeId,
          city: updateData?.city,
          street: updateData?.street,
          building: updateData?.building,
          zipCode: updateData?.zipCode,
          coverPhoto: updateData.coverPhoto,
          photos: updateData.photos,
        },
      })
    );
  };

  const handleViewBookings = (establishmentId: number) => {
    dispatch(getBookingsByEstablishment(establishmentId));
  };

  const handleViewModerators = (establishmentId: number) => {
    dispatch(getEstablishmentModerators(establishmentId));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEstablishment(id));
  };

  const userRowActions = (establishment: EstablishmentType) => (
    <>
      <EditEstablishmentDialog
        establishment={establishment}
        establishmentTypes={establishmentType}
        onUpdate={handleUpdateEstablishment}
      />
      <EstablishmentBookingsDialog
        establishmentId={establishment.id}
        establishmentName={establishment.name}
        bookings={bookings}
        loading={bookingsLoading}
        onOpen={() => handleViewBookings(establishment.id)}
      />
      <ModeratorManagement
        establishment={establishment}
        moderators={moderators}
        loading={moderatorsLoading}
        onOpen={() => handleViewModerators(establishment.id)}
        onAddModerator={userId =>
          dispatch(
            addEstablishmentModerator({
              establishmentId: establishment.id,
              userId,
            })
          )
        }
        onRemoveModerator={userId =>
          dispatch(
            removeEstablishmentModerator({
              establishmentId: establishment.id,
              userId,
            })
          )
        }
      />
      <DropdownMenuSeparator />
      <AppDialogComponent
        title="Delete Establishment"
        triggerText="Delete Establishment"
        description={`Are you sure you want to delete ${establishment.name}? This action cannot be undone.`}
        actionText="Delete"
        onAction={() => handleDelete(establishment.id)}
      />
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
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                  <InputGroupAddon align="inline-end">
                    {establishments.length}
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <CreateEstablishmentDialog
                establishmentTypes={establishmentType}
                onCreated={data => dispatch(createEstablishment(data))}
              />
            </div>
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
      </div>
    </LayoutPage>
  );
};

export default AdminEstablishmentsPage;
