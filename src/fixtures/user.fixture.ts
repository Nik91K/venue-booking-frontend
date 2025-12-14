import type { Role } from '@/types/common';
import type { UserType } from '@/types/user';

export const USER_DATA: Record<Role, UserType | null> = {
  GUEST: null,
  USER: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'USER',
  },
  MODERATOR: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://placehold.co/50x50',
    role: 'MODERATOR',
  },
  OWNER: {
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'OWNER',
  },
  SUBER_ADMIN: {
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    role: 'SUBER_ADMIN',
  },
};
