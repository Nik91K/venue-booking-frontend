import type { Role } from '@/types/common';

export type UserType = {
  id: number;
  name: string;
  email: string;
  avatarSeed: string;
  avatarUrl: string;
  role: Role;
  createdAt: string;
  favorites: number[];
};
