import LayoutPage from '@/layoutPage';
import { useEffect, useState } from 'react';
import { getAllEstablishments } from '@api/slices/establishmentSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
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
import { MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { DropdownMenuItem } from '@components/ui/dropdown-menu';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import PaginationComponent from '@components/common/PaginationComponent';
import { deleteEstablishment } from '@api/slices/establishmentSlice';
import AlertDialogConponent from '@components/common/AlertDialog';
import { getBookingsByEstablishment } from '@api/slices/bookingSlice';
import { getEstablishmentById } from '@api/slices/establishmentSlice';

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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {establishments.map(establishment => (
                    <TableRow key={establishment.id}>
                      <TableCell>{establishment.id}</TableCell>
                      <TableCell>{establishment.name}</TableCell>
                      <TableCell>{establishment.rating}</TableCell>
                      <TableCell>{establishment.ownerId}</TableCell>
                      <TableCell>
                        <div className="text-center">
                          {establishment.commentsCount || 0}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              Edit Establishment
                            </DropdownMenuItem>
                            <AlertDialogConponent
                              triggerText="View Bookings"
                              title={`Bookings for ${establishment.name}`}
                              description="View all reservations for this establishment"
                              actionText="Close"
                              onOpenChange={open => {
                                if (open) {
                                  handleViewBookings(establishment.id);
                                }
                              }}
                            >
                              {bookingsLoading ? (
                                <p>Loading bookings...</p>
                              ) : bookings.length > 0 ? (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                  {bookings.map(booking => (
                                    <div
                                      key={booking.id}
                                      className="p-4 border rounded-lg"
                                    >
                                      <p>
                                        Establishment name:{' '}
                                        {booking.establishment.name}
                                      </p>

                                      <p>Booking ID: {booking.id}</p>
                                      <p>
                                        Date:{' '}
                                        {new Date(
                                          booking.bookingDate
                                        ).toLocaleDateString()}
                                      </p>
                                      <p>Time: {booking.bookingTime}</p>
                                      <p>Guests: {booking.numberOfGuests}</p>
                                      <p>
                                        Status:{' '}
                                        <span
                                          className={`text-${booking.status == `CONFIRMED` ? 'green-500' : 'red-500'}`}
                                        >
                                          {booking.status}
                                        </span>
                                      </p>
                                      {booking.user && (
                                        <p className="text-sm">
                                          User: {booking.user.name} (
                                          {booking.user.email})
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p>No bookings found for this establishment.</p>
                              )}
                            </AlertDialogConponent>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(establishment.id)}
                            >
                              Delete Establishment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
