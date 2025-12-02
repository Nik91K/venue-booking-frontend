import type { Role } from '@/types/common';

export type UserData = {
  name: string;
  email: string;
  avatar?: string;
  role: Role;
};
