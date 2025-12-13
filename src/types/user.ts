import type { Role } from '@/types/common';

export type UserType = {
  name: string;
  email: string;
  avatar?: string;
  role: Role;
};
