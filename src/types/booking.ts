import type { UserType } from './user';
import type { EstablishmentType } from './establishment';

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
