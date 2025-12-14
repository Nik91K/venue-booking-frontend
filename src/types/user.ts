import type { Role } from '@/types/common';

export type UserType = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  createdAt: string;
};
