import LayoutPage from '@/layoutPage';
import { mockUsers } from '@fixtures/charts.fixture';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Search, UserX } from 'lucide-react';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group';
import DataTable from '@components/common/DataTable';
import userColumns from '@components/adminComponents/columns/UserColumns';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';

const AdminUsersPage = () => {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const userRowActions = () => (
    <>
      <DropdownMenuItem>View Details</DropdownMenuItem>
      <DropdownMenuItem>Edit User</DropdownMenuItem>
      <DropdownMenuItem>View Bookings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive">
        Delete User
      </DropdownMenuItem>
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
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10"
                  />
                  <InputGroupAddon align="inline-end">
                    12 results
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedRole === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedRole === 'USER' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('USER')}
                  size="sm"
                >
                  Users
                </Button>
                <Button
                  variant={selectedRole === 'OWNER' ? 'default' : 'outline'}
                  onClick={() => setSelectedRole('OWNER')}
                  size="sm"
                >
                  Owner
                </Button>
                <Button
                  variant={
                    selectedRole === 'SUPER_ADMIN' ? 'default' : 'outline'
                  }
                  onClick={() => setSelectedRole('SUPER_ADMIN')}
                  size="sm"
                >
                  Admin
                </Button>
              </div>
            </div>

            <div className="rounded-md border border-border">
              <DataTable
                data={filteredUsers}
                emptyMessage="No users found"
                columns={userColumns}
                rowActions={userRowActions}
              />
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UserX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  Try to find something else
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </LayoutPage>
  );
};

export default AdminUsersPage;
