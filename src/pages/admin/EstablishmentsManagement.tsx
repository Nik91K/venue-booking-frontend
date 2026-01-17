import LayoutPage from '@/layoutPage';
import { useEffect, useState } from 'react';
import { getAllEstablishments } from '@/api/slices/establishmentSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/api/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { addError } from '@/api/slices/errorSlice';
import { convertError } from '@/hooks/logger/errorConverter';
import PaginationComponent from '@/components/common/PaginationComponent';

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
  const [establishment] = useState(establishments);

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  });

  useEffect(() => {
    dispatch(getAllEstablishments({ page, take }));
  }, [page, take, dispatch]);

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
            <CardTitle>Establishmets</CardTitle>
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
                    {establishment.length} results
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
                    <TableHead>Comm</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {establishment.map(establishments => (
                    <TableRow key={establishments.id}>
                      <TableCell>{establishments.id}</TableCell>
                      <TableCell>{establishments.name}</TableCell>
                      <TableCell>{establishments.rating}</TableCell>
                      <TableCell>{establishments.ownerId}</TableCell>
                      <TableCell>
                        <div className="text-center">
                          {establishments.comments.length}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Establishment
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Bookings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!loading && establishment.length > 0 && (
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
