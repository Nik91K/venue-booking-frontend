import type { UserType } from '@/types/user';
import { Badge } from '@components/ui/badge';
import { Mail, Phone, Calendar } from 'lucide-react';
import type { DataTableColumn } from '@components/common/DataTable';

const userColumns: DataTableColumn<UserType>[] = [
  {
    header: 'User',
    render: user => (
      <div>
        <div className="font-medium">{user.name}</div>
      </div>
    ),
  },
  {
    header: 'Contact',
    render: user => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3 w-3 text-muted-foreground" />
          {user.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-3 w-3" />
          {user.phoneNumber}
        </div>
      </div>
    ),
  },
  {
    header: 'Role',
    render: user => <Badge>{user.role}</Badge>,
  },
  {
    header: 'Bookings',
    render: user => <div className="text-right">{user.bookings.length}</div>,
  },
  {
    header: 'Joined',
    render: user => (
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-3 w-3 text-muted-foreground" />
        {user.createdAt}
      </div>
    ),
  },
];

export default userColumns;
