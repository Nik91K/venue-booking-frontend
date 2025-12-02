import type { Role } from '@/types/common';
import type { UserData } from '@/types/user';

export const USER_DATA: Record<Role, UserData | null> = {
  guest: null,
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
  },
  moderator: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://placehold.co/50x50',
    role: 'moderator',
  },
  admin: {
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'admin',
  },
  superAdmin: {
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    role: 'superAdmin',
  },
};
