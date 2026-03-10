import type { Role } from '@/types/common';

export const ROLE_CONFIG: Record<
  Role,
  { label: string; className: string } | null
> = {
  GUEST: null,
  USER: null,
  MODERATOR: {
    label: 'Mod',
    className: 'bg-sky-100 text-sky-700 border border-sky-200',
  },
  SUPER_ADMIN: {
    label: 'Admin',
    className: 'bg-rose-100 text-rose-700 border border-rose-200',
  },
  OWNER: {
    label: 'Owner',
    className: 'bg-violet-100 text-violet-700 border border-violet-200',
  },
};
