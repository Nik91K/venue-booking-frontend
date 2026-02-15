import type { UserType } from '@/types/user';
import type { EstablishmentType } from '@/types/establishment';

export type BookingType = {
  id: number;
  establishment: EstablishmentType;
  bookingDate: Date;
  bookingTime: string;
  numberOfGuests: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  user: UserType;
};
