import type { Role } from '@/types/common';
import type { BookingType } from './booking';

export type UserType = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  avatarSeed: string;
  avatarUrl: string;
  role: Role;
  createdAt: string;
  favorites: number[];
  bookings: BookingType[];
};
