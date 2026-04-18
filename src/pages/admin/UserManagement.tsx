import LayoutPage from '@/layoutPage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import DataTable from '@components/common/DataTable';
import userColumns from '@components/tableColumns/UserColumns';
import { getAllUsers, deleteUser } from '@api/slices/userSlice';
import { useAppSelector, useAppDispatch } from '@api/hooks';
import type { UserType } from '@/types/user';
import { ROLES } from '@/constants/roles';
import { useDebounce } from 'use-debounce';
import AppDialogComponent from '@components/common/alert/ConfirmDialog';

const AdminUsersPage = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [debouncedSearch] = useDebounce(search, 400);

  const { users, loading, meta } = useAppSelector(state => state.users);

  const roleFilters = [
    'all',
    ...Object.values(ROLES).filter(role => role !== ROLES.GUEST),
  ];
  const filteredUsers = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return users.filter(user => {
      const matchesSearch =
        normalizedSearch === '' ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.phoneNumber.toLowerCase().includes(normalizedSearch);
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [users, debouncedSearch, selectedRole]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers({ page: meta?.page, take: meta?.take }));
    }
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteUser({ id }));
  };

  const userRowActions = (user: UserType) => (
    <>
      <AppDialogComponent
        title="Delete User"
        triggerText="Delete User"
        description={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
        actionText="Delete"
        onAction={() => handleDelete(user.id)}
      />
    </>
  );

  return (
    <LayoutPage>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor all users on the platform
            </p>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Search and filter users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <InputGroup>
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Search by email, name, or phone number..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10"
                  />
                  <InputGroupAddon align="inline-end">
                    {filteredUsers.length} results
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="flex gap-2">
                {roleFilters.map(role => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? 'default' : 'outline'}
                    onClick={() => setSelectedRole(role)}
                    size="sm"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
            <DataTable
              data={filteredUsers}
              loading={loading}
              emptyMessage="No users found"
              columns={userColumns}
              rowActions={userRowActions}
            />
          </CardContent>
        </Card>
      </div>
    </LayoutPage>
  );
};

export default AdminUsersPage;
