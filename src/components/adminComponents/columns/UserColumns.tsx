import { mockUsers } from '@fixtures/charts.fixture';
import { Badge } from '@components/ui/badge';
import { Mail, Phone, Calendar } from 'lucide-react';
import type { DataTableColumn } from '@components/common/DataTable';

type User = (typeof mockUsers)[number];

const userColumns: DataTableColumn<User>[] = [
  {
    header: 'User',
    render: user => (
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="text-xs text-muted-foreground">
          Last active: {user.lastActive}
        </div>
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
          {user.phone}
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
    render: user => <div className="text-right">{user.bookings}</div>,
  },
  {
    header: 'Joined',
    render: user => (
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="h-3 w-3 text-muted-foreground" />
        {user.joinedAt}
      </div>
    ),
  },
];

export default userColumns;
